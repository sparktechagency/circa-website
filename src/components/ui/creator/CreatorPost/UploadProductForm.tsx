'use client'

import { ImageIcon, Link, ShoppingBag, Upload, X } from "lucide-react";
import { useRef, useState } from "react";

export default function UploadProductDialog({ isOpen, onClose }: {isOpen: boolean, onClose: ()=>void}) {
  const [productType, setProductType] = useState("physical");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [pictureFile, setPictureFile] = useState<any>(null);
  const [digitalFile, setDigitalFile] = useState<any>(null);
  const [resourceLink, setResourceLink] = useState("");
  const pictureRef = useRef(null);
  const digitalRef = useRef(null);
 
  const handleSubmit = () => {
    const data = { title, price, description, productType, resourceLink };
    const files = { pictureFile, digitalFile };
    console.log("Product Data:", data);
    console.log("Product Files:", files);
    onClose();
    resetForm();
  };
 
  const resetForm = () => {
    setTitle(""); setPrice(""); setDescription("");
    setPictureFile(null); setDigitalFile(null);
    setResourceLink(""); setProductType("physical");
  };
 
  if (!isOpen) return null;
 
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
 
      {/* Dialog */}
      <div className="relative w-full sm:max-w-lg bg-[#0f1018] border border-white/10 rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 flex items-center justify-center">
              <ShoppingBag size={15} className="text-indigo-400" />
            </div>
            <h2 className="text-white font-bold text-lg tracking-tight">Upload Product</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          >
            <X size={15} />
          </button>
        </div>
 
        <div className="px-6 py-5 space-y-5 overflow-y-auto max-h-[75vh]">
          {/* Product Type Toggle */}
          <div className="space-y-2.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Product Type</label>
            <div className="space-y-2">
              {[
                { value: "physical", label: "Physical item", desc: "Ships to customer" },
                { value: "digital", label: "Digital item", desc: "Instant download" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setProductType(opt.value)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl border transition-all text-left ${
                    productType === opt.value
                      ? "border-indigo-500/60 bg-indigo-500/10"
                      : "border-white/8 bg-[#12131a] hover:border-white/15"
                  }`}
                >
                  <div>
                    <p className={`text-sm font-medium ${productType === opt.value ? "text-white" : "text-gray-400"}`}>
                      {opt.label}
                    </p>
                    <p className="text-xs text-gray-600 mt-0.5">{opt.desc}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    productType === opt.value ? "border-indigo-500" : "border-gray-600"
                  }`}>
                    {productType === opt.value && (
                      <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
 
          {/* Title */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Product name..."
              className="w-full bg-[#12131a] border border-white/8 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 transition-all"
            />
          </div>
 
          {/* Price */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Price</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                type="number"
                min="0"
                className="w-full bg-[#12131a] border border-white/8 rounded-xl pl-8 pr-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 transition-all"
              />
            </div>
          </div>
 
          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your product..."
              rows={4}
              className="w-full bg-[#12131a] border border-white/8 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 transition-all resize-none"
            />
          </div>
 
          {/* Upload picture */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Upload Picture</label>
            <input ref={pictureRef} type="file" accept="image/*,video/*,audio/*" className="hidden"
            
              onChange={(e) => setPictureFile(e.target.files?.[0] || null)} />
            <button              
              className="w-full border border-dashed border-white/15 rounded-xl py-8 flex flex-col items-center gap-2 hover:border-indigo-500/40 hover:bg-indigo-500/5 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                <ImageIcon size={18} className="text-indigo-400" />
              </div>
              {pictureFile ? (
                <p className="text-xs text-indigo-400 font-medium">{pictureFile.name}</p>
              ) : (
                <>
                  <p className="text-xs text-gray-400 font-medium">Tap to browse</p>
                  <p className="text-xs text-gray-600">Image, Video or Audio</p>
                </>
              )}
            </button>
          </div>
 
          {/* Digital-only fields */}
          {productType === "digital" && (
            <>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Upload File</label>
                <input ref={digitalRef} type="file" accept="image/*,video/*,.pdf,.zip" className="hidden"
                  onChange={(e) => setDigitalFile(e.target.files?.[0])} />
                <button                  
                  className="w-full border border-dashed border-white/15 rounded-xl py-8 flex flex-col items-center gap-2 hover:border-indigo-500/40 hover:bg-indigo-500/5 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                    <Upload size={18} className="text-indigo-400" />
                  </div>
                  {digitalFile ? (
                    <p className="text-xs text-indigo-400 font-medium">{digitalFile.name}</p>
                  ) : (
                    <>
                      <p className="text-xs text-gray-400 font-medium">Upload digital file</p>
                      <p className="text-xs text-gray-600">Support Image, video, pdf, zip</p>
                      <p className="text-xs text-gray-600">(Max 500 mb)</p>
                    </>
                  )}
                </button>
              </div>
 
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                  Resource Link <span className="text-gray-600 normal-case font-normal">(optional)</span>
                </label>
                <div className="relative">
                  <Link size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                  <input
                    value={resourceLink}
                    onChange={(e) => setResourceLink(e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-[#12131a] border border-white/8 rounded-xl pl-9 pr-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 transition-all"
                  />
                </div>
              </div>
            </>
          )}
        </div>
 
        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/8">
          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-500 hover:bg-indigo-600 active:scale-[0.98] text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-indigo-500/25"
          >
            Publish Product
          </button>
        </div>
      </div>
    </div>
  );
}