import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { BloomEffect, EffectComposer, EffectPass, RenderPass, SMAAEffect, SMAAPreset } from 'postprocessing';

import './Hyperspeed.css';

interface EffectOptions {
    onSpeedUp?: () => void;
    onSlowDown?: () => void;
    distortion?: string;
    length?: number;
    roadWidth?: number;
    islandWidth?: number;
    lanesPerRoad?: number;
    fov?: number;
    fovSpeedUp?: number;
    speedUp?: number;
    carLightsFade?: number;
    totalSideLightSticks?: number;
    lightPairsPerRoadWay?: number;
    shoulderLinesWidthPercentage?: number;
    brokenLinesWidthPercentage?: number;
    brokenLinesLengthPercentage?: number;
    lightStickWidth?: number[];
    lightStickHeight?: number[];
    movingAwaySpeed?: number[];
    movingCloserSpeed?: number[];
    carLightsLength?: number[];
    carLightsRadius?: number[];
    carWidthPercentage?: number[];
    carShiftX?: number[];
    carFloorSeparation?: number[];
    colors?: {
        roadColor?: number;
        islandColor?: number;
        background?: number;
        shoulderLines?: number;
        brokenLines?: number;
        leftCars?: number[];
        rightCars?: number[];
        sticks?: number;
    };
}

interface HyperspeedProps {
    effectOptions?: EffectOptions;
}

const defaultOptions: EffectOptions = {
    onSpeedUp: () => { },
    onSlowDown: () => { },
    distortion: 'turbulentDistortion',
    length: 400,
    roadWidth: 10,
    islandWidth: 2,
    lanesPerRoad: 4,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 20,
    lightPairsPerRoadWay: 40,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5],
    lightStickHeight: [1.3, 1.7],
    movingAwaySpeed: [60, 80],
    movingCloserSpeed: [-120, -160],
    carLightsLength: [400 * 0.03, 400 * 0.2],
    carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5],
    carShiftX: [-0.8, 0.8],
    carFloorSeparation: [0, 5],
    colors: {
        roadColor: 0x080808,
        islandColor: 0x0a0a0a,
        background: 0x000000,
        shoulderLines: 0xffffff,
        brokenLines: 0xffffff,
        leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
        rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
        sticks: 0x03b3c3
    }
};

const Hyperspeed = ({ effectOptions = defaultOptions }: HyperspeedProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const appRef = useRef<any>(null);
    const [isVisible, setIsVisible] = useState(true);
    const isVisibleRef = useRef(true);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Visibility Observer
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
                isVisibleRef.current = entry.isIntersecting;
            },
            { threshold: 0 }
        );
        observer.observe(container);

        // Cleanup previous instance
        if (appRef.current) {
            appRef.current.dispose();
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        }

        // Merge options
        const options = { ...defaultOptions, ...effectOptions };

        // Uniforms for distortions
        const mountainUniforms = {
            uFreq: { value: new THREE.Vector3(3, 6, 10) },
            uAmp: { value: new THREE.Vector3(30, 30, 20) }
        };

        const xyUniforms = {
            uFreq: { value: new THREE.Vector2(5, 2) },
            uAmp: { value: new THREE.Vector2(25, 15) }
        };

        const LongRaceUniforms = {
            uFreq: { value: new THREE.Vector2(2, 3) },
            uAmp: { value: new THREE.Vector2(35, 10) }
        };

        const turbulentUniforms = {
            uFreq: { value: new THREE.Vector4(4, 8, 8, 1) },
            uAmp: { value: new THREE.Vector4(25, 5, 10, 10) }
        };

        const deepUniforms = {
            uFreq: { value: new THREE.Vector2(4, 8) },
            uAmp: { value: new THREE.Vector2(10, 20) },
            uPowY: { value: new THREE.Vector2(20, 2) }
        };

        const nsin = (val: number) => Math.sin(val) * 0.5 + 0.5;

        const distortions: Record<string, any> = {
            mountainDistortion: {
                uniforms: mountainUniforms,
                getDistortion: `
          uniform vec3 uAmp;
          uniform vec3 uFreq;
          #define PI 3.14159265358979
          float nsin(float val){
            return sin(val) * 0.5 + 0.5;
          }
          vec3 getDistortion(float progress){
            float movementProgressFix = 0.02;
            return vec3( 
              cos(progress * PI * uFreq.x + uTime) * uAmp.x - cos(movementProgressFix * PI * uFreq.x + uTime) * uAmp.x,
              nsin(progress * PI * uFreq.y + uTime) * uAmp.y - nsin(movementProgressFix * PI * uFreq.y + uTime) * uAmp.y,
              nsin(progress * PI * uFreq.z + uTime) * uAmp.z - nsin(movementProgressFix * PI * uFreq.z + uTime) * uAmp.z
            );
          }
        `,
                getJS: (progress: number, time: number) => {
                    const movementProgressFix = 0.02;
                    const uFreq = mountainUniforms.uFreq.value;
                    const uAmp = mountainUniforms.uAmp.value;
                    const distortion = new THREE.Vector3(
                        Math.cos(progress * Math.PI * uFreq.x + time) * uAmp.x -
                        Math.cos(movementProgressFix * Math.PI * uFreq.x + time) * uAmp.x,
                        nsin(progress * Math.PI * uFreq.y + time) * uAmp.y -
                        nsin(movementProgressFix * Math.PI * uFreq.y + time) * uAmp.y,
                        nsin(progress * Math.PI * uFreq.z + time) * uAmp.z -
                        nsin(movementProgressFix * Math.PI * uFreq.z + time) * uAmp.z
                    );
                    const lookAtAmp = new THREE.Vector3(2, 2, 2);
                    const lookAtOffset = new THREE.Vector3(0, 0, -5);
                    return distortion.multiply(lookAtAmp).add(lookAtOffset);
                }
            },
            xyDistortion: {
                uniforms: xyUniforms,
                getDistortion: `
          uniform vec2 uFreq;
          uniform vec2 uAmp;
          #define PI 3.14159265358979
          vec3 getDistortion(float progress){
            float movementProgressFix = 0.02;
            return vec3( 
              cos(progress * PI * uFreq.x + uTime) * uAmp.x - cos(movementProgressFix * PI * uFreq.x + uTime) * uAmp.x,
              sin(progress * PI * uFreq.y + PI/2. + uTime) * uAmp.y - sin(movementProgressFix * PI * uFreq.y + PI/2. + uTime) * uAmp.y,
              0.
            );
          }
        `,
                getJS: (progress: number, time: number) => {
                    const movementProgressFix = 0.02;
                    const uFreq = xyUniforms.uFreq.value;
                    const uAmp = xyUniforms.uAmp.value;
                    const distortion = new THREE.Vector3(
                        Math.cos(progress * Math.PI * uFreq.x + time) * uAmp.x -
                        Math.cos(movementProgressFix * Math.PI * uFreq.x + time) * uAmp.x,
                        Math.sin(progress * Math.PI * uFreq.y + time + Math.PI / 2) * uAmp.y -
                        Math.sin(movementProgressFix * Math.PI * uFreq.y + time + Math.PI / 2) * uAmp.y,
                        0
                    );
                    const lookAtAmp = new THREE.Vector3(2, 0.4, 1);
                    const lookAtOffset = new THREE.Vector3(0, 0, -3);
                    return distortion.multiply(lookAtAmp).add(lookAtOffset);
                }
            },
            LongRaceDistortion: {
                uniforms: LongRaceUniforms,
                getDistortion: `
          uniform vec2 uFreq;
          uniform vec2 uAmp;
          #define PI 3.14159265358979
          vec3 getDistortion(float progress){
            float camProgress = 0.0125;
            return vec3( 
              sin(progress * PI * uFreq.x + uTime) * uAmp.x - sin(camProgress * PI * uFreq.x + uTime) * uAmp.x,
              sin(progress * PI * uFreq.y + uTime) * uAmp.y - sin(camProgress * PI * uFreq.y + uTime) * uAmp.y,
              0.
            );
          }
        `,
                getJS: (progress: number, time: number) => {
                    const camProgress = 0.0125;
                    const uFreq = LongRaceUniforms.uFreq.value;
                    const uAmp = LongRaceUniforms.uAmp.value;
                    const distortion = new THREE.Vector3(
                        Math.sin(progress * Math.PI * uFreq.x + time) * uAmp.x -
                        Math.sin(camProgress * Math.PI * uFreq.x + time) * uAmp.x,
                        Math.sin(progress * Math.PI * uFreq.y + time) * uAmp.y -
                        Math.sin(camProgress * Math.PI * uFreq.y + time) * uAmp.y,
                        0
                    );
                    const lookAtAmp = new THREE.Vector3(1, 1, 0);
                    const lookAtOffset = new THREE.Vector3(0, 0, -5);
                    return distortion.multiply(lookAtAmp).add(lookAtOffset);
                }
            },
            turbulentDistortion: {
                uniforms: turbulentUniforms,
                getDistortion: `
          uniform vec4 uFreq;
          uniform vec4 uAmp;
          float nsin(float val){
            return sin(val) * 0.5 + 0.5;
          }
          #define PI 3.14159265358979
          float getDistortionX(float progress){
            return (
              cos(PI * progress * uFreq.r + uTime) * uAmp.r +
              pow(cos(PI * progress * uFreq.g + uTime * (uFreq.g / uFreq.r)), 2. ) * uAmp.g
            );
          }
          float getDistortionY(float progress){
            return (
              -nsin(PI * progress * uFreq.b + uTime) * uAmp.b +
              -pow(nsin(PI * progress * uFreq.a + uTime / (uFreq.b / uFreq.a)), 5.) * uAmp.a
            );
          }
          vec3 getDistortion(float progress){
            return vec3(
              getDistortionX(progress) - getDistortionX(0.0125),
              getDistortionY(progress) - getDistortionY(0.0125),
              0.
            );
          }
        `,
                getJS: (progress: number, time: number) => {
                    const uFreq = turbulentUniforms.uFreq.value;
                    const uAmp = turbulentUniforms.uAmp.value;

                    const getX = (p: number) =>
                        Math.cos(Math.PI * p * uFreq.x + time) * uAmp.x +
                        Math.pow(Math.cos(Math.PI * p * uFreq.y + time * (uFreq.y / uFreq.x)), 2) * uAmp.y;

                    const getY = (p: number) =>
                        -nsin(Math.PI * p * uFreq.z + time) * uAmp.z -
                        Math.pow(nsin(Math.PI * p * uFreq.w + time / (uFreq.z / uFreq.w)), 5) * uAmp.w;

                    const distortion = new THREE.Vector3(
                        getX(progress) - getX(progress + 0.007),
                        getY(progress) - getY(progress + 0.007),
                        0
                    );
                    const lookAtAmp = new THREE.Vector3(-2, -5, 0);
                    const lookAtOffset = new THREE.Vector3(0, 0, -10);
                    return distortion.multiply(lookAtAmp).add(lookAtOffset);
                }
            },
            deepDistortion: {
                uniforms: deepUniforms,
                getDistortion: `
          uniform vec4 uFreq;
          uniform vec4 uAmp;
          uniform vec2 uPowY;
          float nsin(float val){
            return sin(val) * 0.5 + 0.5;
          }
          #define PI 3.14159265358979
          float getDistortionX(float progress){
            return (
              sin(progress * PI * uFreq.x + uTime) * uAmp.x
            );
          }
          float getDistortionY(float progress){
            return (
              pow(abs(progress * uPowY.x), uPowY.y) + sin(progress * PI * uFreq.y + uTime) * uAmp.y
            );
          }
          vec3 getDistortion(float progress){
            return vec3(
              getDistortionX(progress) - getDistortionX(0.02),
              getDistortionY(progress) - getDistortionY(0.02),
              0.
            );
          }
        `,
                getJS: (progress: number, time: number) => {
                    const uFreq = deepUniforms.uFreq.value;
                    const uAmp = deepUniforms.uAmp.value;
                    const uPowY = deepUniforms.uPowY.value;

                    const getX = (p: number) => Math.sin(p * Math.PI * uFreq.x + time) * uAmp.x;
                    const getY = (p: number) => Math.pow(p * uPowY.x, uPowY.y) + Math.sin(p * Math.PI * uFreq.y + time) * uAmp.y;

                    const distortion = new THREE.Vector3(
                        getX(progress) - getX(progress + 0.01),
                        getY(progress) - getY(progress + 0.01),
                        0
                    );
                    const lookAtAmp = new THREE.Vector3(-2, -4, 0);
                    const lookAtOffset = new THREE.Vector3(0, 0, -10);
                    return distortion.multiply(lookAtAmp).add(lookAtOffset);
                }
            }
        };

        // Helper functions
        const random = (base: number | number[]) => {
            if (Array.isArray(base)) return Math.random() * (base[1] - base[0]) + base[0];
            return Math.random() * base;
        };

        const pickRandom = (arr: any) => {
            if (Array.isArray(arr)) return arr[Math.floor(Math.random() * arr.length)];
            return arr;
        };

        const lerp = (current: number, target: number, speed = 0.1, limit = 0.001) => {
            let change = (target - current) * speed;
            if (Math.abs(change) < limit) {
                change = target - current;
            }
            return change;
        };

        // Shader code
        const carLightsFragment = `
      #define USE_FOG;
      ${THREE.ShaderChunk['fog_pars_fragment']}
      varying vec3 vColor;
      varying vec2 vUv; 
      uniform vec2 uFade;
      void main() {
        vec3 color = vec3(vColor);
        float alpha = smoothstep(uFade.x, uFade.y, vUv.x);
        gl_FragColor = vec4(color, alpha);
        if (gl_FragColor.a < 0.0001) discard;
        ${THREE.ShaderChunk['fog_fragment']}
      }
    `;

        const carLightsVertex = `
      #define USE_FOG;
      ${THREE.ShaderChunk['fog_pars_vertex']}
      attribute vec3 aOffset;
      attribute vec3 aMetrics;
      attribute vec3 aColor;
      uniform float uTravelLength;
      uniform float uTime;
      varying vec2 vUv; 
      varying vec3 vColor; 
      #include <getDistortion_vertex>
      void main() {
        vec3 transformed = position.xyz;
        float radius = aMetrics.r;
        float myLength = aMetrics.g;
        float speed = aMetrics.b;

        transformed.xy *= radius;
        transformed.z *= myLength;

        transformed.z += myLength - mod(uTime * speed + aOffset.z, uTravelLength);
        transformed.xy += aOffset.xy;

        float progress = abs(transformed.z / uTravelLength);
        transformed.xyz += getDistortion(progress);

        vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);
        gl_Position = projectionMatrix * mvPosition;
        vUv = uv;
        vColor = aColor;
        ${THREE.ShaderChunk['fog_vertex']}
      }
    `;

        const sideSticksVertex = `
      #define USE_FOG;
      ${THREE.ShaderChunk['fog_pars_vertex']}
      attribute float aOffset;
      attribute vec3 aColor;
      attribute vec2 aMetrics;
      uniform float uTravelLength;
      uniform float uTime;
      varying vec3 vColor;
      mat4 rotationY( in float angle ) {
        return mat4(	cos(angle),		0,		sin(angle),	0,
                     0,		1.0,			 0,	0,
                -sin(angle),	0,		cos(angle),	0,
                0, 		0,				0,	1);
      }
      #include <getDistortion_vertex>
      void main(){
        vec3 transformed = position.xyz;
        float width = aMetrics.x;
        float height = aMetrics.y;

        transformed.xy *= vec2(width, height);
        float time = mod(uTime * 60. * 2. + aOffset, uTravelLength);

        transformed = (rotationY(3.14/2.) * vec4(transformed,1.)).xyz;

        transformed.z += - uTravelLength + time;

        float progress = abs(transformed.z / uTravelLength);
        transformed.xyz += getDistortion(progress);

        transformed.y += height / 2.;
        transformed.x += -width / 2.;
        vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);
        gl_Position = projectionMatrix * mvPosition;
        vColor = aColor;
        ${THREE.ShaderChunk['fog_vertex']}
      }
    `;

        const sideSticksFragment = `
      #define USE_FOG;
      ${THREE.ShaderChunk['fog_pars_fragment']}
      varying vec3 vColor;
      void main(){
        vec3 color = vec3(vColor);
        gl_FragColor = vec4(color,1.);
        ${THREE.ShaderChunk['fog_fragment']}
      }
    `;

        const roadBaseFragment = `
      #define USE_FOG;
      varying vec2 vUv; 
      uniform vec3 uColor;
      uniform float uTime;
      #include <roadMarkings_vars>
      ${THREE.ShaderChunk['fog_pars_fragment']}
      void main() {
        vec2 uv = vUv;
        vec3 color = vec3(uColor);
        #include <roadMarkings_fragment>
        gl_FragColor = vec4(color, 1.);
        ${THREE.ShaderChunk['fog_fragment']}
      }
    `;

        const islandFragment = roadBaseFragment
            .replace('#include <roadMarkings_fragment>', '')
            .replace('#include <roadMarkings_vars>', '');

        const roadMarkings_vars = `
      uniform float uLanes;
      uniform vec3 uBrokenLinesColor;
      uniform vec3 uShoulderLinesColor;
      uniform float uShoulderLinesWidthPercentage;
      uniform float uBrokenLinesWidthPercentage;
      uniform float uBrokenLinesLengthPercentage;
    `;

        const roadMarkings_fragment = `
      uv.y = mod(uv.y + uTime * 0.05, 1.);
      float laneWidth = 1.0 / uLanes;
      float brokenLineWidth = laneWidth * uBrokenLinesWidthPercentage;
      float laneEmptySpace = 1. - uBrokenLinesLengthPercentage;

      float brokenLines = step(1.0 - brokenLineWidth, fract(uv.x * 2.0)) * step(laneEmptySpace, fract(uv.y * 10.0));
      float sideLines = step(1.0 - brokenLineWidth, fract((uv.x - laneWidth * (uLanes - 1.0)) * 2.0)) + step(brokenLineWidth, uv.x);

      brokenLines = mix(brokenLines, sideLines, uv.x);
    `;

        const roadFragment = roadBaseFragment
            .replace('#include <roadMarkings_fragment>', roadMarkings_fragment)
            .replace('#include <roadMarkings_vars>', roadMarkings_vars);

        const roadVertex = `
      #define USE_FOG;
      uniform float uTime;
      ${THREE.ShaderChunk['fog_pars_vertex']}
      uniform float uTravelLength;
      varying vec2 vUv; 
      #include <getDistortion_vertex>
      void main() {
        vec3 transformed = position.xyz;
        vec3 distortion = getDistortion((transformed.y + uTravelLength / 2.) / uTravelLength);
        transformed.x += distortion.x;
        transformed.z += distortion.y;
        transformed.y += -1. * distortion.z;  
        
        vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.);
        gl_Position = projectionMatrix * mvPosition;
        vUv = uv;
        ${THREE.ShaderChunk['fog_vertex']}
      }
    `;

        // Get the distortion config
        const distortionConfig = distortions[options.distortion || 'turbulentDistortion'];
        const appOptions = { ...options, distortion: distortionConfig };

        // Create renderer - optimized for performance
        const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'low-power' });
        renderer.setSize(container.offsetWidth, container.offsetHeight, false);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.0));
        container.appendChild(renderer.domElement);

        // Create composer
        const composer = new EffectComposer(renderer);

        // Create camera
        const camera = new THREE.PerspectiveCamera(
            options.fov || 90,
            container.offsetWidth / container.offsetHeight,
            0.1,
            10000
        );
        camera.position.set(0, 8, -5);

        // Create scene
        const scene = new THREE.Scene();
        scene.background = null;

        const fog = new THREE.Fog(options.colors?.background || 0x000000, (options.length || 400) * 0.2, (options.length || 400) * 500);
        scene.fog = fog;

        const fogUniforms = {
            fogColor: { value: fog.color },
            fogNear: { value: fog.near },
            fogFar: { value: fog.far }
        };

        const clock = new THREE.Clock();
        let disposed = false;
        let fovTarget = options.fov || 90;
        let speedUpTarget = 0;
        let speedUp = 0;
        let timeOffset = 0;

        // Create road
        const createPlane = (side: number, isRoad: boolean) => {
            const segments = 100;
            const geometry = new THREE.PlaneGeometry(
                isRoad ? options.roadWidth : options.islandWidth,
                options.length,
                20,
                segments
            );

            let uniforms: any = {
                uTravelLength: { value: options.length },
                uColor: { value: new THREE.Color(isRoad ? options.colors?.roadColor : options.colors?.islandColor) },
                uTime: { value: 0 }
            };

            if (isRoad) {
                uniforms = {
                    ...uniforms,
                    uLanes: { value: options.lanesPerRoad },
                    uBrokenLinesColor: { value: new THREE.Color(options.colors?.brokenLines) },
                    uShoulderLinesColor: { value: new THREE.Color(options.colors?.shoulderLines) },
                    uShoulderLinesWidthPercentage: { value: options.shoulderLinesWidthPercentage },
                    uBrokenLinesLengthPercentage: { value: options.brokenLinesLengthPercentage },
                    uBrokenLinesWidthPercentage: { value: options.brokenLinesWidthPercentage }
                };
            }

            const material = new THREE.ShaderMaterial({
                fragmentShader: isRoad ? roadFragment : islandFragment,
                vertexShader: roadVertex,
                side: THREE.DoubleSide,
                uniforms: { ...uniforms, ...fogUniforms, ...distortionConfig.uniforms }
            });

            material.onBeforeCompile = (shader: any) => {
                shader.vertexShader = shader.vertexShader.replace(
                    '#include <getDistortion_vertex>',
                    distortionConfig.getDistortion
                );
            };

            const mesh = new THREE.Mesh(geometry, material);
            mesh.rotation.x = -Math.PI / 2;
            mesh.position.z = -(options.length || 400) / 2;
            mesh.position.x += ((options.islandWidth || 2) / 2 + (options.roadWidth || 10) / 2) * side;
            scene.add(mesh);

            return mesh;
        };

        const leftRoadWay = createPlane(-1, true);
        const rightRoadWay = createPlane(1, true);
        const island = createPlane(0, false);

        // Create car lights
        const createCarLights = (colors: number[], speed: number[], fade: THREE.Vector2, xOffset: number) => {
            const curve = new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1));
            const geometry = new THREE.TubeGeometry(curve, 40, 1, 8, false);
            const instanced = new THREE.InstancedBufferGeometry().copy(geometry as any) as any;
            instanced.instanceCount = (options.lightPairsPerRoadWay || 40) * 2;

            const laneWidth = (options.roadWidth || 10) / (options.lanesPerRoad || 4);
            const aOffset: number[] = [];
            const aMetrics: number[] = [];
            const aColor: number[] = [];

            const colorObjs = colors.map(c => new THREE.Color(c));

            for (let i = 0; i < (options.lightPairsPerRoadWay || 40); i++) {
                const radius = random(options.carLightsRadius || [0.05, 0.14]);
                const length = random(options.carLightsLength || [12, 80]);
                const spd = random(speed);

                const carLane = i % (options.lanesPerRoad || 4);
                let laneX = carLane * laneWidth - (options.roadWidth || 10) / 2 + laneWidth / 2;

                const carWidth = random(options.carWidthPercentage || [0.3, 0.5]) * laneWidth;
                const carShiftX = random(options.carShiftX || [-0.8, 0.8]) * laneWidth;
                laneX += carShiftX;

                const offsetY = random(options.carFloorSeparation || [0, 5]) + radius * 1.3;
                const offsetZ = -random(options.length || 400);

                aOffset.push(laneX - carWidth / 2, offsetY, offsetZ);
                aOffset.push(laneX + carWidth / 2, offsetY, offsetZ);

                aMetrics.push(radius, length, spd);
                aMetrics.push(radius, length, spd);

                const color = pickRandom(colorObjs);
                aColor.push(color.r, color.g, color.b);
                aColor.push(color.r, color.g, color.b);
            }

            instanced.setAttribute('aOffset', new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 3, false));
            instanced.setAttribute('aMetrics', new THREE.InstancedBufferAttribute(new Float32Array(aMetrics), 3, false));
            instanced.setAttribute('aColor', new THREE.InstancedBufferAttribute(new Float32Array(aColor), 3, false));

            const material = new THREE.ShaderMaterial({
                fragmentShader: carLightsFragment,
                vertexShader: carLightsVertex,
                transparent: true,
                uniforms: {
                    uTime: { value: 0 },
                    uTravelLength: { value: options.length },
                    uFade: { value: fade },
                    ...fogUniforms,
                    ...distortionConfig.uniforms
                }
            });

            material.onBeforeCompile = (shader: any) => {
                shader.vertexShader = shader.vertexShader.replace(
                    '#include <getDistortion_vertex>',
                    distortionConfig.getDistortion
                );
            };

            const mesh = new THREE.Mesh(instanced, material);
            mesh.frustumCulled = false;
            mesh.position.setX(xOffset);
            scene.add(mesh);

            return mesh;
        };

        const leftCarLights = createCarLights(
            options.colors?.leftCars || [0xd856bf, 0x6750a2, 0xc247ac],
            options.movingAwaySpeed || [60, 80],
            new THREE.Vector2(0, 1 - (options.carLightsFade || 0.4)),
            -(options.roadWidth || 10) / 2 - (options.islandWidth || 2) / 2
        );

        const rightCarLights = createCarLights(
            options.colors?.rightCars || [0x03b3c3, 0x0e5ea5, 0x324555],
            options.movingCloserSpeed || [-120, -160],
            new THREE.Vector2(1, 0 + (options.carLightsFade || 0.4)),
            (options.roadWidth || 10) / 2 + (options.islandWidth || 2) / 2
        );

        // Create light sticks
        const createLightSticks = () => {
            const geometry = new THREE.PlaneGeometry(1, 1);
            const instanced = new THREE.InstancedBufferGeometry().copy(geometry as any) as any;
            const totalSticks = options.totalSideLightSticks || 20;
            instanced.instanceCount = totalSticks;

            const stickoffset = (options.length || 400) / (totalSticks - 1);
            const aOffset: number[] = [];
            const aColor: number[] = [];
            const aMetrics: number[] = [];

            const stickColor = new THREE.Color(options.colors?.sticks || 0x03b3c3);

            for (let i = 0; i < totalSticks; i++) {
                const width = random(options.lightStickWidth || [0.12, 0.5]);
                const height = random(options.lightStickHeight || [1.3, 1.7]);
                aOffset.push((i - 1) * stickoffset * 2 + stickoffset * Math.random());
                aColor.push(stickColor.r, stickColor.g, stickColor.b);
                aMetrics.push(width, height);
            }

            instanced.setAttribute('aOffset', new THREE.InstancedBufferAttribute(new Float32Array(aOffset), 1, false));
            instanced.setAttribute('aColor', new THREE.InstancedBufferAttribute(new Float32Array(aColor), 3, false));
            instanced.setAttribute('aMetrics', new THREE.InstancedBufferAttribute(new Float32Array(aMetrics), 2, false));

            const material = new THREE.ShaderMaterial({
                fragmentShader: sideSticksFragment,
                vertexShader: sideSticksVertex,
                side: THREE.DoubleSide,
                uniforms: {
                    uTravelLength: { value: options.length },
                    uTime: { value: 0 },
                    ...fogUniforms,
                    ...distortionConfig.uniforms
                }
            });

            material.onBeforeCompile = (shader: any) => {
                shader.vertexShader = shader.vertexShader.replace(
                    '#include <getDistortion_vertex>',
                    distortionConfig.getDistortion
                );
            };

            const mesh = new THREE.Mesh(instanced, material);
            mesh.frustumCulled = false;
            mesh.position.setX(-((options.roadWidth || 10) + (options.islandWidth || 2) / 2));
            scene.add(mesh);

            return mesh;
        };

        const leftSticks = createLightSticks();

        // Setup post-processing
        const renderPass = new RenderPass(scene, camera);
        const bloomPass = new EffectPass(
            camera,
            new BloomEffect({
                luminanceThreshold: 0.2,
                luminanceSmoothing: 0,
                resolutionScale: 1
            })
        );

        const smaaPass = new EffectPass(
            camera,
            new SMAAEffect({
                preset: SMAAPreset.MEDIUM
            })
        );

        renderPass.renderToScreen = false;
        bloomPass.renderToScreen = false;
        smaaPass.renderToScreen = true;

        composer.addPass(renderPass);
        composer.addPass(bloomPass);
        composer.addPass(smaaPass);

        // Event handlers
        const onMouseDown = () => {
            if (options.onSpeedUp) options.onSpeedUp();
            fovTarget = options.fovSpeedUp || 150;
            speedUpTarget = options.speedUp || 2;
        };

        const onMouseUp = () => {
            if (options.onSlowDown) options.onSlowDown();
            fovTarget = options.fov || 90;
            speedUpTarget = 0;
        };

        const onResize = () => {
            const width = container.offsetWidth;
            const height = container.offsetHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            composer.setSize(width, height);
        };

        container.addEventListener('mousedown', onMouseDown);
        container.addEventListener('mouseup', onMouseUp);
        container.addEventListener('mouseout', onMouseUp);
        container.addEventListener('touchstart', onMouseDown, { passive: true });
        container.addEventListener('touchend', onMouseUp, { passive: true });
        window.addEventListener('resize', onResize);

        // Animation loop
        const tick = () => {
            if (disposed || !isVisibleRef.current) return;

            const delta = clock.getDelta();
            const lerpPercentage = Math.exp(-(-60 * Math.log2(1 - 0.1)) * delta);

            speedUp += lerp(speedUp, speedUpTarget, lerpPercentage, 0.00001);
            timeOffset += speedUp * delta;

            const time = clock.elapsedTime + timeOffset;

            // Update materials
            (leftCarLights.material as THREE.ShaderMaterial).uniforms.uTime.value = time;
            (rightCarLights.material as THREE.ShaderMaterial).uniforms.uTime.value = time;
            (leftSticks.material as THREE.ShaderMaterial).uniforms.uTime.value = time;
            (leftRoadWay.material as THREE.ShaderMaterial).uniforms.uTime.value = time;
            (rightRoadWay.material as THREE.ShaderMaterial).uniforms.uTime.value = time;
            (island.material as THREE.ShaderMaterial).uniforms.uTime.value = time;

            // Update camera FOV
            const fovChange = lerp(camera.fov, fovTarget, lerpPercentage);
            if (fovChange !== 0) {
                camera.fov += fovChange * delta * 6;
                camera.updateProjectionMatrix();
            }

            // Update camera look-at based on distortion
            if (distortionConfig.getJS) {
                const distortion = distortionConfig.getJS(0.025, time);
                camera.lookAt(
                    new THREE.Vector3(
                        camera.position.x + distortion.x,
                        camera.position.y + distortion.y,
                        camera.position.z + distortion.z
                    )
                );
                camera.updateProjectionMatrix();
            }

            composer.render(delta);
            requestAnimationFrame(tick);
        };

        if (isVisible) {
            tick();
        }

        // Store active state for restart
        appRef.current = {
            tick,
            dispose: () => {
                disposed = true;
                container.removeEventListener('mousedown', onMouseDown);
                container.removeEventListener('mouseup', onMouseUp);
                container.removeEventListener('mouseout', onMouseUp);
                container.removeEventListener('touchstart', onMouseDown);
                container.removeEventListener('touchend', onMouseUp);
                window.removeEventListener('resize', onResize);
                renderer.dispose();
                composer.dispose();
                scene.clear();
            }
        };

        return () => {
            if (appRef.current) {
                appRef.current.dispose();
            }
        };
    }, [effectOptions, isVisible]);

    return <div id="lights" ref={containerRef} style={{ width: '100%', height: '100%' }}></div>;
};

export default Hyperspeed;
