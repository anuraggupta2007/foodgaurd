"use client";

import { useEffect, useRef, useState } from "react";
import { ScanLine, VideoOff } from "lucide-react";

type ScannerViewportProps = {
  alignText: string;
  scanningText: string;
  isScanning?: boolean;
  showCamera: boolean;
  onCapture?: (imageData: string) => void;
  captureLabel?: string;
};

export function ScannerViewport({
  alignText,
  scanningText,
  isScanning = false,
  showCamera,
  onCapture,
  captureLabel = "Capture",
}: ScannerViewportProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraState, setCameraState] = useState<"idle" | "loading" | "active" | "error">("idle");
  const prevShowCameraRef = useRef(showCamera);

  useEffect(() => {
    if (!showCamera && prevShowCameraRef.current) {
      const stream = streamRef.current;
      const video = videoRef.current;
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      if (video) {
        video.srcObject = null;
      }
      setCameraState("idle");
    }
    prevShowCameraRef.current = showCamera;
  }, [showCamera]);

  useEffect(() => {
    if (!showCamera) return;
    let cancelled = false;
    const videoEl = videoRef.current;

    const init = async () => {
      setCameraState("loading");
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoEl) {
          videoEl.srcObject = stream;
          await videoEl.play();
        }
        if (!cancelled) {
          setCameraState("active");
        }
      } catch {
        if (!cancelled) {
          setCameraState("error");
        }
      }
    };

    const timer = setTimeout(init, 0);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      const stream = streamRef.current;
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      if (videoEl) {
        videoEl.srcObject = null;
      }
    };
  }, [showCamera]);

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current || !onCapture) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
      onCapture(dataUrl);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-black aspect-[4/3] sm:aspect-[16/10]">
      <canvas ref={canvasRef} className="hidden" />

      {showCamera && cameraState === "active" && (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {showCamera && cameraState === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="flex flex-col items-center gap-3">
            <div className="size-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-white/70">Starting camera...</p>
          </div>
        </div>
      )}

      {showCamera && cameraState === "error" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="flex flex-col items-center gap-3 text-center px-4">
            <VideoOff className="size-10 text-white/40" aria-hidden="true" />
            <p className="text-sm text-white/70">Camera unavailable</p>
            <p className="text-xs text-white/40">Check permissions and try again</p>
          </div>
        </div>
      )}

      {!showCamera && (
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      )}

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-2/3 max-w-[240px] aspect-square">
          <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-primary/80 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-primary/80 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-primary/80 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-primary/80 rounded-br-lg" />
          {isScanning && (
            <div className="absolute inset-x-2 top-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan-line" />
          )}
          {!showCamera && !isScanning && (
            <div className="absolute inset-0 flex items-center justify-center">
              <ScanLine className="size-10 text-white/20" aria-hidden="true" />
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4">
        <div className="flex items-center justify-center gap-2">
          {isScanning && (
            <div className="size-2 rounded-full bg-primary animate-pulse" />
          )}
          <p className="text-sm text-white/90 font-medium">
            {isScanning ? scanningText : alignText}
          </p>
        </div>
      </div>

      {showCamera && cameraState === "active" && onCapture && (
        <div className="absolute bottom-16 inset-x-0 flex justify-center">
          <button
            type="button"
            onClick={handleCapture}
            className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium shadow-lg hover:bg-primary/90 transition-colors"
          >
            {captureLabel}
          </button>
        </div>
      )}
    </div>
  );
}
