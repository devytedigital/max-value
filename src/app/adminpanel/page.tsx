"use client";

import React, { useState, useEffect } from "react";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar, { AdminTab } from "@/components/admin/AdminSidebar";
import DashboardOverview from "@/components/admin/DashboardOverview";
import BoardManagement from "@/components/admin/BoardManagement";
import ServicesManagement from "@/components/admin/ServicesManagement";
import MediaManagement, { MediaSubTab } from "@/components/admin/MediaManagement";
import CareerManagement from "@/components/admin/CareerManagement";
import NewsManagement from "@/components/admin/NewsManagement";
import BranchManagement from "@/components/admin/BranchManagement";

import {
  initialDirectors,
  initialServices,
  initialImages,
  initialVideos,
  initialDownloads,
  initialCareers,
  initialNews,
  initialBranches,
  DirectorItem,
  ServiceItem,
  ImageGalleryItem,
  VideoGalleryItem,
  DownloadItem,
  CareerItem,
  NewsItem,
  BranchItem,
} from "@/data/adminData";

export default function AdminPanelPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Module Datasets State
  const [directors, setDirectors] = useState<DirectorItem[]>(initialDirectors);
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [images, setImages] = useState<ImageGalleryItem[]>(initialImages);
  const [videos, setVideos] = useState<VideoGalleryItem[]>(initialVideos);
  const [downloads, setDownloads] = useState<DownloadItem[]>(initialDownloads);
  const [careers, setCareers] = useState<CareerItem[]>(initialCareers);
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [branches, setBranches] = useState<BranchItem[]>(initialBranches);

  // Check stored auth session
  useEffect(() => {
    setMounted(true);
    const sessionAuth = localStorage.getItem("maxvalue_admin_auth");
    if (sessionAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem("maxvalue_admin_auth", "true");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("maxvalue_admin_auth");
  };

  // Convert media tab name to subTab
  const mediaSubTab: MediaSubTab =
    activeTab === "media-videos"
      ? "videos"
      : activeTab === "media-downloads"
      ? "downloads"
      : "images";

  const handleSetMediaSubTab = (sub: MediaSubTab) => {
    if (sub === "videos") setActiveTab("media-videos");
    else if (sub === "downloads") setActiveTab("media-downloads");
    else setActiveTab("media-images");
  };

  const getTabTitle = (tab: AdminTab): string => {
    switch (tab) {
      case "dashboard":
        return "Dashboard Overview";
      case "board":
        return "Board of Directors";
      case "services":
        return "Our Services";
      case "media-images":
        return "Media - Image Gallery";
      case "media-videos":
        return "Media - Video Gallery";
      case "media-downloads":
        return "Media - Downloads & Documents";
      case "career":
        return "Career & Vacancies";
      case "news":
        return "News & Press Releases";
      case "branches":
        return "Branch Network";
      default:
        return "Admin Console";
    }
  };

  if (!mounted) return null;

  if (!isAuthenticated) {
    return <AdminLogin onSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 selection:bg-[#147FC3] selection:text-white">
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <AdminSidebar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setSearchTerm("");
          }}
          isOpen={sidebarOpen}
          onCloseMobile={() => setSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Header */}
          <AdminHeader
            activeTabTitle={getTabTitle(activeTab)}
            onLogout={handleLogout}
            toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          {/* Body Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {activeTab === "dashboard" && (
              <DashboardOverview
                counts={{
                  directors: directors.length,
                  services: services.length,
                  images: images.length,
                  videos: videos.length,
                  downloads: downloads.length,
                  careers: careers.length,
                  news: news.length,
                  branches: branches.length,
                }}
                setActiveTab={setActiveTab}
                onOpenAddModal={(targetTab) => {
                  setActiveTab(targetTab);
                }}
              />
            )}

            {activeTab === "board" && (
              <BoardManagement
                directors={directors}
                setDirectors={setDirectors}
                searchTerm={searchTerm}
              />
            )}

            {activeTab === "services" && (
              <ServicesManagement
                services={services}
                setServices={setServices}
                searchTerm={searchTerm}
              />
            )}

            {activeTab.startsWith("media-") && (
              <MediaManagement
                subTab={mediaSubTab}
                setSubTab={handleSetMediaSubTab}
                images={images}
                setImages={setImages}
                videos={videos}
                setVideos={setVideos}
                downloads={downloads}
                setDownloads={setDownloads}
                searchTerm={searchTerm}
              />
            )}

            {activeTab === "career" && (
              <CareerManagement
                careers={careers}
                setCareers={setCareers}
                searchTerm={searchTerm}
              />
            )}

            {activeTab === "news" && (
              <NewsManagement
                news={news}
                setNews={setNews}
                searchTerm={searchTerm}
              />
            )}

            {activeTab === "branches" && (
              <BranchManagement
                branches={branches}
                setBranches={setBranches}
                searchTerm={searchTerm}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
