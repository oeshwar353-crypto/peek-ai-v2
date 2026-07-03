// ================================================================
//  PEEK AI — Creator Workspace Controller v3
//  Clean, modular, production-grade JavaScript
// ================================================================

const API_BASE = "https://peek-ai-v2.onrender.com";

// ── STATE ────────────────────────────────────────────────────────
const state = {
  projects: [],
  activeProject: null,
  groqKey: "",
  activeGeneratorType: "Reel Script",
  chatHistory: []
};

// ── ELEMENT CACHE ─────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

const el = {
  // Sidebar
  projectSelectorBtn:    $("projectSelectorBtn"),
  activeProjectName:     $("activeProjectName"),
  projectsDropdown:      $("projectsDropdown"),
  projectsList:          $("projectsList"),
  newProjectBtn:         $("newProjectBtn"),
  sidebarNav:            $("sidebarNav"),
  statScriptsCount:      $("statScriptsCount"),
  statAnalysisScore:     $("statAnalysisScore"),

  // Topbar
  breadcrumbLabel:       $("breadcrumbLabel"),
  headerProjectPill:     $("headerProjectPill"),
  headerProjectName:     $("headerProjectName"),

  // Home
  homeGreeting:          $("homeGreeting"),
  projectNotes:          $("projectNotes"),
  saveNotesBtn:          $("saveNotesBtn"),

  // Analyze
  uploadZone:            $("uploadZone"),
  screenshotInput:       $("screenshotInput"),
  previewContainer:      $("previewContainer"),
  screenshotPreview:     $("screenshotPreview"),
  removeUploadBtn:       $("removeUploadBtn"),
  startAnalysisBtn:      $("startAnalysisBtn"),
  aiPipeline:            $("aiPipeline"),
  analysisResultPlaceholder: $("analysisResultPlaceholder"),
  analysisResultContent:     $("analysisResultContent"),
  radialProgressCircle:  $("radialProgressCircle"),
  overallScoreVal:       $("overallScoreVal"),
  viralityScoreVal:      $("viralityScoreVal"),
  viralityBarFill:       $("viralityBarFill"),
  healthBadge:           $("healthBadge"),
  hookScoreVal:          $("hookScoreVal"),
  hookDesc:              $("hookDesc"),
  hookCritique:          $("hookCritique"),
  storyPacing:           $("storyPacing"),
  storyStructure:        $("storyStructure"),
  designHierarchy:       $("designHierarchy"),
  designColors:          $("designColors"),
  ctaEfficiency:         $("ctaEfficiency"),
  ctaAlternative:        $("ctaAlternative"),
  strengthsList:         $("strengthsList"),
  weaknessesList:        $("weaknessesList"),
  bridgeToGeneratorBtn:  $("bridgeToGeneratorBtn"),
  bridgeToCoachBtn:      $("bridgeToCoachBtn"),

  // Create
  tabGenerate:           $("tabGenerate"),
  tabImprove:            $("tabImprove"),
  panelGenerate:         $("panelGenerate"),
  panelImprove:          $("panelImprove"),
  genPlatform:           $("genPlatform"),
  genTone:               $("genTone"),
  genTopic:              $("genTopic"),
  generateAssetBtn:      $("generateAssetBtn"),
  improveType:           $("improveType"),
  improveFocus:          $("improveFocus"),
  improveRawContent:     $("improveRawContent"),
  improveBtn:            $("improveBtn"),
  studioOutputEmpty:     $("studioOutputEmpty"),
  studioOutputContainer: $("studioOutputContainer"),
  studioOutputTitle:     $("studioOutputTitle"),
  studioOutputPreviewText: $("studioOutputPreviewText"),
  studioOutputRationale: $("studioOutputRationale"),
  copyStudioOutputBtn:   $("copyStudioOutputBtn"),
  saveStudioOutputBtn:   $("saveStudioOutputBtn"),

  // Coach
  coachChatMessages:     $("coachChatMessages"),
  coachChatInput:        $("coachChatInput"),
  sendCoachMsgBtn:       $("sendCoachMsgBtn"),
  chatSuggestions:       $("chatSuggestions"),

  // AI Loader
  globalLoader:          $("globalLoader"),
  loadStep1:             $("loadStep1"),
  loadStep2:             $("loadStep2"),
  loadStep3:             $("loadStep3"),
  loadStep4:             $("loadStep4"),

  // Modals
  newProjectModal:       $("newProjectModal"),
  closeNewProjectModalBtn: $("closeNewProjectModalBtn"),
  cancelNewProjectBtn:   $("cancelNewProjectBtn"),
  submitNewProjectBtn:   $("submitNewProjectBtn"),
  newProjectNameInput:   $("newProjectNameInput"),
  savedScriptsModal:     $("savedScriptsModal"),
  closeSavedScriptsModalBtn: $("closeSavedScriptsModalBtn"),
  savedScriptsList:      $("savedScriptsList"),
  scriptsStatChip:       $("scriptsStatChip"),

  // Toast
  toastContainer:        $("toastContainer"),

  // Analyze tabs
  tabAnalyzePost:        $("tabAnalyzePost"),
  tabAnalyzeThumbnail:   $("tabAnalyzeThumbnail"),
  panelThumbnail:        $("panelThumbnail"),
  thumbUploadZone:       $("thumbUploadZone"),
  thumbFileInput:        $("thumbFileInput"),
  thumbPreviewContainer: $("thumbPreviewContainer"),
  thumbPreview:          $("thumbPreview"),
  thumbRemoveBtn:        $("thumbRemoveBtn"),
  analyzeThumbnailBtn:   $("analyzeThumbnailBtn"),
  thumbResultEmpty:      $("thumbResultEmpty"),
  thumbResultContent:    $("thumbResultContent"),
  thumbProgressCircle:   $("thumbProgressCircle"),
  thumbCtrScoreVal:      $("thumbCtrScoreVal"),
  thumbGradeBadge:       $("thumbGradeBadge"),
  thumbOverview:         $("thumbOverview"),
  thumbTitleSynergy:     $("thumbTitleSynergy"),
  thumbColorImpact:      $("thumbColorImpact"),
  thumbEmotion:          $("thumbEmotion"),
  thumbReadability:      $("thumbReadability"),
  thumbSuggestions:      $("thumbSuggestions"),

  // Create extra tabs
  tabFeedback:           $("tabFeedback"),
  tabRewrite:            $("tabRewrite"),
  panelFeedback:         $("panelFeedback"),
  panelRewrite:          $("panelRewrite"),
  feedbackPlatform:      $("feedbackPlatform"),
  feedbackContent:       $("feedbackContent"),
  getFeedbackBtn:        $("getFeedbackBtn"),
  rewriteStyle:          $("rewriteStyle"),
  rewritePlatform:       $("rewritePlatform"),
  rewriteContent:        $("rewriteContent"),
  rewriteBtn:            $("rewriteBtn"),

  // Plan pane
  tabCalendar:           $("tabCalendar"),
  tabStrategy:           $("tabStrategy"),
  panelCalendar:         $("panelCalendar"),
  panelStrategy:         $("panelStrategy"),
  calPlatform:           $("calPlatform"),
  calDays:               $("calDays"),
  calNiche:              $("calNiche"),
  calAudience:           $("calAudience"),
  calBrief:              $("calBrief"),
  generateCalendarBtn:   $("generateCalendarBtn"),
  calendarEmpty:         $("calendarEmpty"),
  calendarResult:        $("calendarResult"),
  calendarGrid:          $("calendarGrid"),
  calendarResultTitle:   $("calendarResultTitle"),
  copyCalendarBtn:       $("copyCalendarBtn"),
  stratGoal:             $("stratGoal"),
  stratPlatform:         $("stratPlatform"),
  stratTimeframe:        $("stratTimeframe"),
  stratNiche:            $("stratNiche"),
  stratAudience:         $("stratAudience"),
  generateStrategyBtn:   $("generateStrategyBtn"),
  strategyEmpty:         $("strategyEmpty"),
  strategyResult:        $("strategyResult"),
  strategyContent:       $("strategyContent"),
  copyStrategyBtn:       $("copyStrategyBtn"),

  // Inspire pane
  tabIdeas:              $("tabIdeas"),
  tabBreakdown:          $("tabBreakdown"),
  panelIdeas:            $("panelIdeas"),
  panelBreakdown:        $("panelBreakdown"),
  ideaNiche:             $("ideaNiche"),
  ideaPlatform:          $("ideaPlatform"),
  ideaAudience:          $("ideaAudience"),
  ideaCount:             $("ideaCount"),
  generateIdeasBtn:      $("generateIdeasBtn"),
  ideasEmpty:            $("ideasEmpty"),
  ideasResult:           $("ideasResult"),
  ideasGrid:             $("ideasGrid"),
  breakdownPlatform:     $("breakdownPlatform"),
  breakdownContent:      $("breakdownContent"),
  breakdownBtn:          $("breakdownBtn"),
  breakdownEmpty:        $("breakdownEmpty"),
  breakdownResult:       $("breakdownResult"),
  breakdownContent2:     $("breakdownContent2"),
  copyBreakdownBtn:      $("copyBreakdownBtn"),
};

let lastOutputPayload = null;

// ── BOOT ──────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  // Init Lucide icons
  if (window.lucide) lucide.createIcons();

  setGreeting();
  initNavigation();
  initEventListeners();
  loadProjects();
  addSvgGradient();
  initOnboarding();

});

// ── GREETING ──────────────────────────────────────────────────────
function setGreeting() {
  const hour = new Date().getHours();
  let g = "Good morning";
  if (hour >= 12 && hour < 17) g = "Good afternoon";
  else if (hour >= 17) g = "Good evening";
  if (el.homeGreeting) el.homeGreeting.textContent = g;
}

// ── ONBOARDING MODAL ──────────────────────────────────────────────
function initOnboarding() {
  const backdrop  = $("onboardingBackdrop");
  const modal     = $("onboardingModal");
  const launchBtn = $("obLaunchBtn");
  const closeBtn  = $("obCloseBtn");
  const dontShow  = $("obDontShow");

  if (!backdrop) return;

  // If user previously dismissed with "don't show again", skip
  if (localStorage.getItem("peekAiOnboardingDone") === "1") {
    backdrop.classList.add("hidden");
    return;
  }

  // Show the modal (it's visible by default via CSS, just ensure icons render)
  if (window.lucide) lucide.createIcons();

  // Dismiss helper — plays exit animation then hides
  function dismissOnboarding() {
    // Save preference if checkbox is checked
    if (dontShow && dontShow.checked) {
      localStorage.setItem("peekAiOnboardingDone", "1");
    }
    modal.classList.add("ob-exit");
    backdrop.classList.add("ob-exit");
    setTimeout(() => {
      backdrop.classList.add("hidden");
      modal.classList.remove("ob-exit");
      backdrop.classList.remove("ob-exit");
    }, 380);
  }

  // Launch Workspace button
  launchBtn.addEventListener("click", () => {
    // Show loading state
    launchBtn.classList.add("ob-loading");
    launchBtn.disabled = true;
    setTimeout(() => {
      dismissOnboarding();
      // Reset button after modal is gone
      setTimeout(() => {
        launchBtn.classList.remove("ob-loading");
        launchBtn.disabled = false;
      }, 400);
    }, 800);
  });

  // Close (X) button
  closeBtn.addEventListener("click", dismissOnboarding);


  // Click backdrop (outside modal) to close
  backdrop.addEventListener("click", e => {
    if (e.target === backdrop) dismissOnboarding();
  });

  // Esc key to close
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !backdrop.classList.contains("hidden")) {
      dismissOnboarding();
    }
  });
}

// ── SVG GRADIENT for score ring ───────────────────────────────────
function addSvgGradient() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "0"); svg.setAttribute("height", "0");
  svg.style.position = "absolute";
  svg.innerHTML = `
    <defs>
      <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#2563eb"/>
        <stop offset="100%" stop-color="#a855f7"/>
      </linearGradient>
    </defs>`;
  document.body.prepend(svg);
}

// ── NAVIGATION ────────────────────────────────────────────────────
const PANE_LABELS = {
  "pane-home":    "Home",
  "pane-analyze": "Analyze",
  "pane-create":  "Create",
  "pane-coach":   "Coach",
  "pane-plan":    "Plan",
  "pane-inspire": "Inspire",
};

function initNavigation() {
  $$(".nav-link").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      navigateTo(link.dataset.pane);
    });
  });

  // All home-page navigation buttons (quick actions, feature cards, CTAs)
  $$("[data-pane]").forEach(btn => {
    if (!btn.classList.contains("nav-link")) {
      btn.addEventListener("click", e => {
        e.stopPropagation();
        const pane = btn.dataset.pane;
        if (pane) navigateTo(pane);
      });
    }
  });
}

function navigateTo(paneId) {
  // Update active pane
  $$(".pane").forEach(p => p.classList.remove("active"));
  const target = $(paneId);
  if (target) target.classList.add("active");

  // Update sidebar nav
  $$(".nav-link").forEach(l => {
    l.classList.toggle("active", l.dataset.pane === paneId);
  });

  // Update breadcrumb
  if (el.breadcrumbLabel) el.breadcrumbLabel.textContent = PANE_LABELS[paneId] || paneId;
}

// Expose for inline HTML calls
window.switchTab = navigateTo;

// ── EVENTS ────────────────────────────────────────────────────────
function initEventListeners() {
  // Project dropdown
  el.projectSelectorBtn.addEventListener("click", e => {
    e.stopPropagation();
    el.projectsDropdown.classList.toggle("hidden");
  });
  document.addEventListener("click", () => el.projectsDropdown.classList.add("hidden"));

  // New project button
  el.newProjectBtn.addEventListener("click", e => {
    e.stopPropagation();
    el.projectsDropdown.classList.add("hidden");
    openModal(el.newProjectModal);
  });


  // New project modal
  el.closeNewProjectModalBtn.addEventListener("click", () => closeModal(el.newProjectModal));
  el.cancelNewProjectBtn.addEventListener("click", () => closeModal(el.newProjectModal));
  el.submitNewProjectBtn.addEventListener("click", handleCreateProject);

  // Saved Scripts modal
  el.scriptsStatChip.addEventListener("click", handleOpenSavedScripts);
  el.closeSavedScriptsModalBtn.addEventListener("click", () => closeModal(el.savedScriptsModal));

  // Close modal on overlay click
  $$(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", e => {
      if (e.target === overlay) closeModal(overlay);
    });
  });

  // Home scratchpad
  el.saveNotesBtn.addEventListener("click", handleSaveNotes);

  // Upload zone
  el.uploadZone.addEventListener("click", () => el.screenshotInput.click());
  el.screenshotInput.addEventListener("change", handleFileSelect);
  el.removeUploadBtn.addEventListener("click", handleRemoveFile);
  el.startAnalysisBtn.addEventListener("click", handleRunAnalysis);

  el.uploadZone.addEventListener("dragover", e => {
    e.preventDefault();
    el.uploadZone.style.borderColor = "var(--blue)";
  });
  el.uploadZone.addEventListener("dragleave", () => {
    el.uploadZone.style.borderColor = "";
  });
  el.uploadZone.addEventListener("drop", e => {
    e.preventDefault();
    el.uploadZone.style.borderColor = "";
    if (e.dataTransfer.files.length > 0) {
      el.screenshotInput.files = e.dataTransfer.files;
      handleFileSelect();
    }
  });

  // Bridge actions
  el.bridgeToGeneratorBtn.addEventListener("click", () => {
    if (!state.activeProject?.analysis) return;
    const recs = state.activeProject.analysis.improvement_suggestions || [];
    el.genTopic.value = `Implement improvements: ${recs.slice(0, 2).join(", ")}`;
    toggleStudioPanel("generate");
    navigateTo("pane-create");
    showToast("Analysis context applied to Studio", "info");
  });

  el.bridgeToCoachBtn.addEventListener("click", () => {
    if (!state.activeProject?.analysis) return;
    el.coachChatInput.value = "Review my latest analysis. How can I boost hook retention?";
    navigateTo("pane-coach");
    el.coachChatInput.focus();
  });

  // Studio tabs
  el.tabGenerate.addEventListener("click", () => toggleStudioPanel("generate"));
  el.tabImprove.addEventListener("click",   () => toggleStudioPanel("improve"));
  el.tabFeedback.addEventListener("click",  () => toggleStudioPanel("feedback"));
  el.tabRewrite.addEventListener("click",   () => toggleStudioPanel("rewrite"));

  // Analyze tabs
  el.tabAnalyzePost.addEventListener("click", () => toggleAnalyzePanel("post"));
  el.tabAnalyzeThumbnail.addEventListener("click", () => toggleAnalyzePanel("thumbnail"));

  // Thumbnail upload
  el.thumbUploadZone.addEventListener("click", () => el.thumbFileInput.click());
  el.thumbFileInput.addEventListener("change", handleThumbFileSelect);
  el.thumbRemoveBtn.addEventListener("click", handleThumbRemove);
  el.analyzeThumbnailBtn.addEventListener("click", handleAnalyzeThumbnail);
  el.thumbUploadZone.addEventListener("dragover", e => { e.preventDefault(); el.thumbUploadZone.style.borderColor = "var(--blue)"; });
  el.thumbUploadZone.addEventListener("dragleave", () => { el.thumbUploadZone.style.borderColor = ""; });
  el.thumbUploadZone.addEventListener("drop", e => { e.preventDefault(); el.thumbUploadZone.style.borderColor = ""; if (e.dataTransfer.files.length > 0) { el.thumbFileInput.files = e.dataTransfer.files; handleThumbFileSelect(); } });

  // Feedback & Rewrite
  el.getFeedbackBtn.addEventListener("click", handleGetFeedback);
  el.rewriteBtn.addEventListener("click", handleRewrite);

  // Plan pane
  el.tabCalendar.addEventListener("click", () => togglePlanPanel("calendar"));
  el.tabStrategy.addEventListener("click", () => togglePlanPanel("strategy"));
  el.generateCalendarBtn.addEventListener("click", handleGenerateCalendar);
  el.generateStrategyBtn.addEventListener("click", handleGenerateStrategy);
  el.copyCalendarBtn.addEventListener("click", () => { copyCalendarText(); });
  el.copyStrategyBtn.addEventListener("click", () => { navigator.clipboard.writeText(el.strategyContent.innerText); showToast("Copied", "success"); });

  // Inspire pane
  el.tabIdeas.addEventListener("click", () => toggleInspirePanel("ideas"));
  el.tabBreakdown.addEventListener("click", () => toggleInspirePanel("breakdown"));
  el.generateIdeasBtn.addEventListener("click", handleGenerateIdeas);
  el.breakdownBtn.addEventListener("click", handleBreakdown);
  el.copyBreakdownBtn.addEventListener("click", () => { navigator.clipboard.writeText(el.breakdownContent2.innerText); showToast("Copied", "success"); });

  // Asset type cards
  $$(".asset-card").forEach(card => {
    card.addEventListener("click", () => {
      $$(".asset-card").forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      state.activeGeneratorType = card.dataset.value;
    });
  });

  // Generate & improve
  el.generateAssetBtn.addEventListener("click", handleGenerateAsset);
  el.improveBtn.addEventListener("click", handleImproveContent);

  // Output actions
  el.copyStudioOutputBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(el.studioOutputPreviewText.value);
    showToast("Copied to clipboard", "success");
  });
  el.saveStudioOutputBtn.addEventListener("click", handleSaveStudioOutput);

  // Coach
  el.sendCoachMsgBtn.addEventListener("click", handleSendCoachMessage);
  el.coachChatInput.addEventListener("keydown", e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendCoachMessage();
    }
  });
}

// ── MODAL HELPERS ─────────────────────────────────────────────────
function openModal(modal) { modal.classList.remove("hidden"); }
function closeModal(modal) { modal.classList.add("hidden"); }

// ── TOAST ─────────────────────────────────────────────────────────
function showToast(message, type = "info") {
  const iconMap = {
    success: "check-circle",
    error:   "x-circle",
    warning: "alert-triangle",
    info:    "info",
  };
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="toast-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        ${getIconPath(iconMap[type])}
      </svg>
    </span>
    <span>${message}</span>`;
  el.toastContainer.appendChild(toast);
  setTimeout(() => { toast.style.opacity = "0"; toast.style.transform = "translateX(24px)"; toast.style.transition = "all 0.3s"; }, 3200);
  setTimeout(() => toast.remove(), 3600);
}

function getIconPath(name) {
  const paths = {
    "check-circle": '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
    "x-circle":     '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>',
    "alert-triangle":'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    "info":         '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
  };
  return paths[name] || paths["info"];
}

// ── AI PIPELINE LOADER ────────────────────────────────────────────
async function runLoader(durationMs = 3000) {
  openModal(el.globalLoader);
  const steps = [el.loadStep1, el.loadStep2, el.loadStep3, el.loadStep4];
  steps.forEach(s => { s.classList.remove("active", "done"); });

  const interval = durationMs / steps.length;
  for (let i = 0; i < steps.length; i++) {
    if (i > 0) steps[i - 1].classList.remove("active");
    if (i > 0) steps[i - 1].classList.add("done");
    steps[i].classList.add("active");
    await delay(interval);
  }
  steps[steps.length - 1].classList.add("done");
  await delay(300);
  closeModal(el.globalLoader);
}

const delay = ms => new Promise(r => setTimeout(r, ms));

// ── STUDIO TAB TOGGLE ─────────────────────────────────────────────
function toggleStudioPanel(tab) {
  const tabs   = [el.tabGenerate, el.tabImprove, el.tabFeedback, el.tabRewrite];
  const panels = [el.panelGenerate, el.panelImprove, el.panelFeedback, el.panelRewrite];
  const keys   = ["generate", "improve", "feedback", "rewrite"];
  const idx    = keys.indexOf(tab);
  tabs.forEach((t, i)   => t.classList.toggle("active", i === idx));
  panels.forEach((p, i) => p.classList.toggle("active", i === idx));
}

function toggleAnalyzePanel(tab) {
  const isPost = tab === "post";
  el.tabAnalyzePost.classList.toggle("active", isPost);
  el.tabAnalyzeThumbnail.classList.toggle("active", !isPost);
  // The original analyze layout wraps in .analyze-layout — toggle panelThumbnail
  el.panelThumbnail.classList.toggle("active", !isPost);
  // Hide/show the original analyze-layout (post panel)
  const postPanel = document.querySelector("#pane-analyze .analyze-layout");
  if (postPanel) postPanel.style.display = isPost ? "" : "none";
}

function togglePlanPanel(tab) {
  const isCal = tab === "calendar";
  el.tabCalendar.classList.toggle("active", isCal);
  el.tabStrategy.classList.toggle("active", !isCal);
  el.panelCalendar.classList.toggle("active", isCal);
  el.panelStrategy.classList.toggle("active", !isCal);
}

function toggleInspirePanel(tab) {
  const isIdeas = tab === "ideas";
  el.tabIdeas.classList.toggle("active", isIdeas);
  el.tabBreakdown.classList.toggle("active", !isIdeas);
  el.panelIdeas.classList.toggle("active", isIdeas);
  el.panelBreakdown.classList.toggle("active", !isIdeas);
}

// ── PROJECTS ──────────────────────────────────────────────────────
async function loadProjects() {
  try {
    const res = await fetch(`${API_BASE}/api/projects`);
    state.projects = await res.json();

    // Auto-create a default project on first use so user never sees "select a project"
    if (state.projects.length === 0) {
      await autoCreateDefaultProject();
      return; // selectProject is called inside autoCreateDefaultProject
    }

    renderProjectsList();
    selectProject(state.projects[0].id);
  } catch {
    showToast("Backend service offline — make sure the server is running", "warning");
  }
}

async function autoCreateDefaultProject() {
  try {
    const res = await fetch(`${API_BASE}/api/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "My Workspace" })
    });
    const proj = await res.json();
    state.projects = [proj];
    renderProjectsList();
    selectProject(proj.id);
  } catch {
    showToast("Could not initialize default workspace", "error");
  }
}

function renderProjectsList() {
  el.projectsList.innerHTML = "";
  state.projects.forEach(p => {
    const wrap = document.createElement("div");
    wrap.className = "project-item-btn-wrapper";

    const btn = document.createElement("button");
    btn.className = `project-item-btn ${state.activeProject?.id === p.id ? "active" : ""}`;
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg><span>${p.name}</span>`;
    btn.addEventListener("click", () => { selectProject(p.id); el.projectsDropdown.classList.add("hidden"); });

    const del = document.createElement("button");
    del.className = "project-delete-btn";
    del.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4h6v2"/></svg>`;
    del.addEventListener("click", e => { e.stopPropagation(); handleDeleteProject(p.id); });

    wrap.appendChild(btn);
    wrap.appendChild(del);
    el.projectsList.appendChild(wrap);
  });
}

async function selectProject(id) {
  try {
    const res = await fetch(`${API_BASE}/api/projects/${id}`);
    state.activeProject = await res.json();

    el.activeProjectName.textContent = state.activeProject.name;
    el.headerProjectName.textContent = state.activeProject.name;
    el.projectNotes.value = state.activeProject.notes || "";

    const scripts = state.activeProject.scripts || [];
    el.statScriptsCount.textContent = scripts.length;

    if (state.activeProject.analysis) {
      el.statAnalysisScore.textContent = state.activeProject.analysis.overall_score ?? "—";
      renderAnalysis(state.activeProject.analysis);
    } else {
      el.statAnalysisScore.textContent = "—";
      el.analysisResultPlaceholder.classList.remove("hidden");
      el.analysisResultContent.classList.add("hidden");
    }

    renderCoachHistory();
    renderProjectsList();
    state.chatHistory = state.activeProject.coach_conversations || [];
  } catch {
    showToast("Failed to load project", "error");
  }
}

async function handleCreateProject() {
  const name = el.newProjectNameInput.value.trim();
  if (!name) { showToast("Project name required", "warning"); return; }

  try {
    const res = await fetch(`${API_BASE}/api/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });
    const proj = await res.json();
    state.projects.unshift(proj);
    closeModal(el.newProjectModal);
    el.newProjectNameInput.value = "";
    selectProject(proj.id);
    showToast("Project created", "success");
  } catch {
    showToast("Could not create project", "error");
  }
}

async function handleDeleteProject(id) {
  if (!confirm("Delete this project?")) return;
  try {
    const res = await fetch(`${API_BASE}/api/projects/${id}`, { method: "DELETE" });
    if (res.ok) {
      state.projects = state.projects.filter(p => p.id !== id);
      if (state.activeProject?.id === id) {
        state.activeProject = null;
        el.activeProjectName.textContent = "Select Project";
        el.headerProjectName.textContent = "No Project Selected";
        if (state.projects.length > 0) selectProject(state.projects[0].id);
      }
      renderProjectsList();
    }
  } catch {
    showToast("Delete failed", "error");
  }
}

// ── NOTES ─────────────────────────────────────────────────────────
async function handleSaveNotes() {
  if (!state.activeProject) { showToast("Select a project first", "warning"); return; }
  try {
    const res = await fetch(`${API_BASE}/api/projects/${state.activeProject.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes: el.projectNotes.value })
    });
    state.activeProject = await res.json();
    showToast("Brief saved", "success");
  } catch {
    showToast("Save failed", "error");
  }
}


// ── FILE HANDLING ──────────────────────────────────────────────────
function handleFileSelect() {
  const file = el.screenshotInput.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    el.screenshotPreview.src = e.target.result;
    el.uploadZone.classList.add("hidden");
    el.previewContainer.classList.remove("hidden");
    el.startAnalysisBtn.disabled = false;
  };
  reader.readAsDataURL(file);
}

function handleRemoveFile() {
  el.screenshotInput.value = "";
  el.screenshotPreview.src = "";
  el.uploadZone.classList.remove("hidden");
  el.previewContainer.classList.add("hidden");
  el.startAnalysisBtn.disabled = true;
}

// ── ANALYSIS ──────────────────────────────────────────────────────
async function handleRunAnalysis() {
  if (!state.activeProject) { showToast("Select a project first", "warning"); return; }
  const file = el.screenshotInput.files[0];
  if (!file) return;

  // Show inline pipeline
  el.aiPipeline.classList.remove("hidden");
  await runLoader(4500);
  el.aiPipeline.classList.add("hidden");

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch(`${API_BASE}/api/projects/${state.activeProject.id}/analyze`, {
      method: "POST",
      headers: { "x-groq-key": state.groqKey },
      body: formData
    });
    if (!res.ok) throw new Error();
    const data = await res.json();
    state.activeProject.analysis = data;
    el.statAnalysisScore.textContent = data.overall_score ?? "—";
    renderAnalysis(data);
    showToast("Analysis complete", "success");
  } catch {
    showToast("Analysis failed — check API key and backend", "error");
  }
}

function renderAnalysis(data) {
  el.analysisResultPlaceholder.classList.add("hidden");
  el.analysisResultContent.classList.remove("hidden");

  // Score ring
  const score = data.overall_score ?? 50;
  animateCounter(el.overallScoreVal, score);
  const radius = 50; const circumference = 2 * Math.PI * radius;
  el.radialProgressCircle.setAttribute("stroke", "url(#scoreGrad)");
  el.radialProgressCircle.style.strokeDasharray = circumference;
  requestAnimationFrame(() => {
    el.radialProgressCircle.style.strokeDashoffset = circumference - (score / 100) * circumference;
  });

  // Virality
  const virality = data.virality_score ?? 0;
  animateCounter(el.viralityScoreVal, virality);
  setTimeout(() => { el.viralityBarFill.style.width = `${virality}%`; }, 100);

  // Health badge
  const health = data.content_health || "Needs Attention";
  el.healthBadge.textContent = health;
  el.healthBadge.className = "badge";
  if (health.toLowerCase().includes("healthy")) el.healthBadge.classList.add("badge-green");
  else if (health.toLowerCase().includes("attention")) el.healthBadge.classList.add("badge-amber");
  else el.healthBadge.classList.add("badge-red");

  // Hook
  const hook = data.hook_analysis || {};
  el.hookScoreVal.textContent = hook.score ?? "—";
  el.hookDesc.textContent = hook.description || "";
  el.hookCritique.textContent = hook.critique || "";

  // Storytelling
  const story = data.storytelling || {};
  el.storyPacing.textContent = story.pacing || "—";
  el.storyStructure.textContent = story.structure || "—";

  // Design
  const design = data.visual_design || {};
  el.designHierarchy.textContent = design.hierarchy || "—";
  el.designColors.textContent = design.colors || "—";

  // CTA
  const cta = data.cta || {};
  el.ctaEfficiency.textContent = cta.efficiency || "";
  el.ctaAlternative.textContent = cta.alternative || "";

  // Observations
  renderList(el.strengthsList, data.strengths);
  renderList(el.weaknessesList, data.weaknesses);
}

function renderList(el, items) {
  el.innerHTML = "";
  (items || []).slice(0, 4).forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    el.appendChild(li);
  });
}

function animateCounter(element, target) {
  const start = 0;
  const duration = 1000;
  const startTime = performance.now();
  function update(time) {
    const progress = Math.min((time - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = Math.round(start + (target - start) * eased);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ── CONTENT GENERATION ────────────────────────────────────────────
async function handleGenerateAsset() {
  const topic = el.genTopic.value.trim();
  if (!topic) { showToast("Topic required", "warning"); return; }

  await runLoader(2500);

  const payload = {
    generator_type: state.activeGeneratorType,
    platform: el.genPlatform.value,
    tone: el.genTone.value,
    audience: "Aspiring Creators",
    length: "Medium (60s / 250 words)",
    goal: "Maximize engagement & shares",
    topic
  };

  try {
    const res = await fetch(`${API_BASE}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-groq-key": state.groqKey },
      body: JSON.stringify(payload)
    });
    const data = await res.json();

    lastOutputPayload = { title: data.title, type: "script", content: data.primary_content };

    el.studioOutputEmpty.classList.add("hidden");
    el.studioOutputContainer.classList.remove("hidden");
    el.studioOutputTitle.textContent = data.title || "Generated Asset";
    el.studioOutputPreviewText.value = data.primary_content || "";
    el.studioOutputRationale.textContent = data.meta_tips || "";

    showToast("Content generated", "success");
  } catch {
    showToast("Generation failed — check API key", "error");
  }
}

// ── IMPROVE CONTENT ───────────────────────────────────────────────
async function handleImproveContent() {
  const content = el.improveRawContent.value.trim();
  if (!content) { showToast("Paste your draft first", "warning"); return; }

  await runLoader(2000);

  const payload = {
    content_type: el.improveType.value,
    raw_content: content,
    focus_area: el.improveFocus.value,
    project_context: state.activeProject?.notes || ""
  };

  try {
    const res = await fetch(`${API_BASE}/api/improve`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-groq-key": state.groqKey },
      body: JSON.stringify(payload)
    });
    const data = await res.json();

    lastOutputPayload = { title: `Optimized ${el.improveType.value}`, type: "script", content: data.improved_content };

    el.studioOutputEmpty.classList.add("hidden");
    el.studioOutputContainer.classList.remove("hidden");
    el.studioOutputTitle.textContent = `Optimized ${el.improveType.value}`;
    el.studioOutputPreviewText.value = data.improved_content || "";
    el.studioOutputRationale.textContent = data.why_it_works || "";

    showToast("Draft optimized", "success");
  } catch {
    showToast("Optimization failed", "error");
  }
}

async function handleSaveStudioOutput() {
  if (!state.activeProject || !lastOutputPayload) return;
  const scripts = state.activeProject.scripts || [];
  scripts.push({ title: lastOutputPayload.title, content: el.studioOutputPreviewText.value, timestamp: new Date().toISOString() });

  try {
    const res = await fetch(`${API_BASE}/api/projects/${state.activeProject.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scripts })
    });
    state.activeProject = await res.json();
    el.statScriptsCount.textContent = state.activeProject.scripts.length;
    showToast("Saved to project", "success");
  } catch {
    showToast("Save failed", "error");
  }
}

function handleOpenSavedScripts() {
  if (!state.activeProject) {
    showToast("Select a project first", "warning");
    return;
  }
  renderSavedScripts();
  openModal(el.savedScriptsModal);
}

function renderSavedScripts() {
  el.savedScriptsList.innerHTML = "";
  const scripts = state.activeProject.scripts || [];

  if (scripts.length === 0) {
    el.savedScriptsList.innerHTML = `
      <div class="saved-scripts-empty">
        <i data-lucide="file-text" style="width: 32px; height: 32px; opacity: 0.3;"></i>
        <p>No saved scripts in this project yet.</p>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
    return;
  }

  scripts.forEach((script, index) => {
    const item = document.createElement("div");
    item.className = "saved-script-item";
    
    let formattedDate = "";
    if (script.timestamp) {
      try {
        formattedDate = new Date(script.timestamp).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      } catch (e) {
        formattedDate = script.timestamp;
      }
    }

    item.innerHTML = `
      <div class="saved-script-header">
        <span class="saved-script-title">${escapeHTML(script.title || "Untitled Script")}</span>
        <span class="saved-script-date">${formattedDate}</span>
      </div>
      <div class="saved-script-content">${escapeHTML(script.content || "")}</div>
      <div class="saved-script-actions">
        <button class="btn btn-sm btn-ghost copy-btn">
          <i data-lucide="copy" class="icon-xs"></i> Copy
        </button>
        <button class="btn btn-sm btn-ghost delete-btn" style="color: var(--red); border-color: rgba(239,68,68,0.2);">
          <i data-lucide="trash-2" class="icon-xs"></i> Delete
        </button>
      </div>
    `;

    item.querySelector(".copy-btn").addEventListener("click", () => {
      navigator.clipboard.writeText(script.content);
      showToast("Script copied to clipboard", "success");
    });

    item.querySelector(".delete-btn").addEventListener("click", () => {
      handleDeleteSavedScript(index);
    });

    el.savedScriptsList.appendChild(item);
  });

  if (window.lucide) lucide.createIcons();
}

async function handleDeleteSavedScript(index) {
  if (!confirm("Are you sure you want to delete this script?")) return;
  const scripts = [...(state.activeProject.scripts || [])];
  scripts.splice(index, 1);

  try {
    const res = await fetch(`${API_BASE}/api/projects/${state.activeProject.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scripts })
    });
    state.activeProject = await res.json();
    el.statScriptsCount.textContent = state.activeProject.scripts.length;
    renderSavedScripts();
    showToast("Script deleted", "success");
  } catch {
    showToast("Failed to delete script", "error");
  }
}

function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ── COACH ─────────────────────────────────────────────────────────
function renderCoachHistory() {
  el.coachChatMessages.innerHTML = "";

  // Welcome message
  appendCoachMessage("coach", "Hey, I'm Maverick — your AI content strategist. Ask me about hooks, virality, retention, script structure, or anything about your creator journey.", true);

  if (!state.activeProject?.coach_conversations) return;

  state.activeProject.coach_conversations.forEach(msg => {
    appendCoachMessage(msg.role === "user" ? "user" : "coach", msg.text, false, msg.actions);
  });

  el.coachChatMessages.scrollTop = el.coachChatMessages.scrollHeight;
}

function appendCoachMessage(role, text, welcome = false, actions = null) {
  const wrap = document.createElement("div");
  wrap.className = `chat-msg ${role}`;

  const sender = document.createElement("p");
  sender.className = "msg-sender";
  sender.textContent = role === "user" ? "You" : "Coach Maverick";

  const bubble = document.createElement("div");
  bubble.className = "msg-bubble";
  bubble.textContent = text;

  wrap.appendChild(sender);
  wrap.appendChild(bubble);

  if (role === "coach" && actions && actions.length > 0) {
    const actionsWrap = document.createElement("div");
    actionsWrap.className = "msg-actions";
    actions.slice(0, 3).forEach(a => {
      const chip = document.createElement("span");
      chip.className = "msg-action-item";
      chip.textContent = a;
      actionsWrap.appendChild(chip);
    });
    wrap.appendChild(actionsWrap);
  }

  el.coachChatMessages.appendChild(wrap);
}

function showTypingIndicator() {
  const typing = document.createElement("div");
  typing.className = "chat-msg coach";
  typing.id = "typingIndicator";
  const sender = document.createElement("p");
  sender.className = "msg-sender";
  sender.textContent = "Coach Maverick";
  const bubble = document.createElement("div");
  bubble.className = "typing-bubble";
  bubble.innerHTML = `<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>`;
  typing.appendChild(sender);
  typing.appendChild(bubble);
  el.coachChatMessages.appendChild(typing);
  el.coachChatMessages.scrollTop = el.coachChatMessages.scrollHeight;
  return typing;
}

async function handleSendCoachMessage() {
  const text = el.coachChatInput.value.trim();
  if (!text) return;
  if (!state.activeProject) { showToast("Select a project first", "warning"); return; }

  // Hide suggestions after first message
  el.chatSuggestions.style.display = "none";

  const history = state.activeProject.coach_conversations || [];
  history.push({ role: "user", text });
  el.coachChatInput.value = "";

  appendCoachMessage("user", text);
  el.coachChatMessages.scrollTop = el.coachChatMessages.scrollHeight;

  const typingEl = showTypingIndicator();

  const contextStr = `Notes: ${state.activeProject.notes || ""}\nScore: ${state.activeProject.analysis?.overall_score ?? "None"}`;

  try {
    const res = await fetch(`${API_BASE}/api/coach`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-groq-key": state.groqKey },
      body: JSON.stringify({ question: text, history, context_summary: contextStr })
    });
    const data = await res.json();

    typingEl.remove();

    const coachMsg = { role: "coach", text: data.response, tips: data.recommended_resources_or_tips, actions: data.suggested_next_actions };
    history.push(coachMsg);
    appendCoachMessage("coach", data.response, false, data.suggested_next_actions);
    el.coachChatMessages.scrollTop = el.coachChatMessages.scrollHeight;

    // Persist
    await fetch(`${API_BASE}/api/projects/${state.activeProject.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ coach_conversations: history })
    });
    state.activeProject.coach_conversations = history;
  } catch {
    typingEl.remove();
    showToast("Coach unavailable — check backend", "error");
  }
}

window.askCoachPreset = function(text) {
  if (!state.activeProject) { showToast("Select a project first", "warning"); return; }
  el.coachChatInput.value = text;
  handleSendCoachMessage();
};

window.applyTemplate = function(id) {
  if (id === "reels-hook-opt") {
    el.improveRawContent.value = "Hey guys, check out this insane tech setup — it's so clean!";
    toggleStudioPanel("improve");
    navigateTo("pane-create");
    showToast("Template loaded. Optimize now.", "info");
  } else {
    el.genTopic.value = "3 secrets SaaS founders hide about their early growth metrics.";
    toggleStudioPanel("generate");
    navigateTo("pane-create");
    showToast("Template topic loaded.", "info");
  }
};

// ── THUMBNAIL ANALYZER ────────────────────────────────────────────
function handleThumbFileSelect() {
  const file = el.thumbFileInput.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    el.thumbPreview.src = e.target.result;
    el.thumbUploadZone.classList.add("hidden");
    el.thumbPreviewContainer.classList.remove("hidden");
    el.analyzeThumbnailBtn.disabled = false;
  };
  reader.readAsDataURL(file);
}

function handleThumbRemove() {
  el.thumbFileInput.value = "";
  el.thumbPreview.src = "";
  el.thumbUploadZone.classList.remove("hidden");
  el.thumbPreviewContainer.classList.add("hidden");
  el.analyzeThumbnailBtn.disabled = true;
}

async function handleAnalyzeThumbnail() {
  const file = el.thumbFileInput.files[0];
  if (!file) return;

  await runLoader(3500);

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch(`${API_BASE}/api/analyze/thumbnail`, {
      method: "POST",
      headers: { "x-groq-key": state.groqKey },
      body: formData
    });
    if (!res.ok) throw new Error();
    const data = await res.json();
    renderThumbnailResult(data);
    showToast("Thumbnail analyzed", "success");
  } catch {
    showToast("Analysis failed — check API key", "error");
  }
}

function renderThumbnailResult(data) {
  el.thumbResultEmpty.classList.add("hidden");
  el.thumbResultContent.classList.remove("hidden");

  const score = data.ctr_score ?? data.overall_score ?? 50;
  animateCounter(el.thumbCtrScoreVal, score);
  const radius = 50; const circ = 2 * Math.PI * radius;
  el.thumbProgressCircle.setAttribute("stroke", "url(#scoreGrad)");
  el.thumbProgressCircle.style.strokeDasharray = circ;
  requestAnimationFrame(() => { el.thumbProgressCircle.style.strokeDashoffset = circ - (score / 100) * circ; });

  const grade = data.grade || data.content_health || "—";
  el.thumbGradeBadge.textContent = grade;
  el.thumbGradeBadge.className = "badge " + (grade.toLowerCase().includes("high") || grade.toLowerCase().includes("excellent") ? "badge-green" : grade.toLowerCase().includes("medium") || grade.toLowerCase().includes("good") ? "badge-blue" : "badge-amber");
  el.thumbOverview.textContent = data.overview || data.summary || "";
  el.thumbTitleSynergy.textContent = data.title_synergy || data.hook_analysis?.description || "—";
  el.thumbColorImpact.textContent = data.color_impact || data.visual_design?.colors || "—";
  el.thumbEmotion.textContent = data.emotion_faces || data.emotional_appeal || "—";
  el.thumbReadability.textContent = data.text_readability || data.text_clarity || "—";
  renderList(el.thumbSuggestions, data.suggestions || data.improvement_suggestions || data.weaknesses || []);
}

// ── FEEDBACK ──────────────────────────────────────────────────────
async function handleGetFeedback() {
  const content = el.feedbackContent.value.trim();
  if (!content) { showToast("Paste your content first", "warning"); return; }

  await runLoader(2500);

  try {
    const res = await fetch(`${API_BASE}/api/coach/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-groq-key": state.groqKey },
      body: JSON.stringify({ content, platform: el.feedbackPlatform.value })
    });
    if (!res.ok) throw new Error();
    const data = await res.json();

    lastOutputPayload = { title: "AI Feedback Report", type: "feedback", content: formatFeedback(data) };
    el.studioOutputEmpty.classList.add("hidden");
    el.studioOutputContainer.classList.remove("hidden");
    el.studioOutputTitle.textContent = "AI Feedback Report";
    el.studioOutputPreviewText.value = formatFeedback(data);
    el.studioOutputRationale.textContent = data.summary || "";
    showToast("Feedback ready", "success");
  } catch {
    showToast("Feedback failed — check API key", "error");
  }
}

function formatFeedback(data) {
  const lines = [];
  if (data.strengths?.length) { lines.push("✅ STRENGTHS"); data.strengths.forEach(s => lines.push(`  • ${s}`)); lines.push(""); }
  if (data.weaknesses?.length) { lines.push("⚠️ WEAKNESSES"); data.weaknesses.forEach(w => lines.push(`  • ${w}`)); lines.push(""); }
  if (data.suggestions?.length) { lines.push("💡 SUGGESTIONS"); data.suggestions.forEach(s => lines.push(`  • ${s}`)); lines.push(""); }
  if (data.score !== undefined) lines.push(`📊 SCORE: ${data.score}/100`);
  if (data.hook_rating) lines.push(`🎣 Hook Rating: ${data.hook_rating}`);
  if (data.cta_rating) lines.push(`📢 CTA Rating: ${data.cta_rating}`);
  return lines.join("\n") || JSON.stringify(data, null, 2);
}

// ── REWRITE ───────────────────────────────────────────────────────
async function handleRewrite() {
  const content = el.rewriteContent.value.trim();
  if (!content) { showToast("Paste content to rewrite first", "warning"); return; }

  await runLoader(2000);

  try {
    const res = await fetch(`${API_BASE}/api/coach/rewrite`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-groq-key": state.groqKey },
      body: JSON.stringify({ content, style: el.rewriteStyle.value, platform: el.rewritePlatform.value })
    });
    if (!res.ok) throw new Error();
    const data = await res.json();

    lastOutputPayload = { title: `${el.rewriteStyle.value} Rewrite`, type: "script", content: data.rewritten_content || data.content || "" };
    el.studioOutputEmpty.classList.add("hidden");
    el.studioOutputContainer.classList.remove("hidden");
    el.studioOutputTitle.textContent = `Rewrite — ${el.rewriteStyle.options[el.rewriteStyle.selectedIndex].text}`;
    el.studioOutputPreviewText.value = data.rewritten_content || data.content || "";
    el.studioOutputRationale.textContent = data.why_it_works || data.rationale || "";
    showToast("Rewrite complete", "success");
  } catch {
    showToast("Rewrite failed — check API key", "error");
  }
}

// ── CONTENT CALENDAR ──────────────────────────────────────────────
async function handleGenerateCalendar() {
  const niche = el.calNiche.value.trim();
  if (!niche) { showToast("Enter your niche first", "warning"); return; }

  await runLoader(4000);

  try {
    const res = await fetch(`${API_BASE}/api/plan/content-plan`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-groq-key": state.groqKey },
      body: JSON.stringify({
        days: parseInt(el.calDays.value),
        platform: el.calPlatform.value,
        niche,
        audience: el.calAudience.value || "General audience",
        brief: el.calBrief.value || state.activeProject?.notes || ""
      })
    });
    if (!res.ok) throw new Error();
    const data = await res.json();

    el.calendarEmpty.classList.add("hidden");
    el.calendarResult.classList.remove("hidden");
    el.calendarResultTitle.textContent = `${el.calDays.value}-Day ${el.calPlatform.value} Calendar`;
    renderCalendar(data);
    showToast("Calendar generated", "success");
  } catch {
    showToast("Calendar generation failed", "error");
  }
}

function renderCalendar(data) {
  el.calendarGrid.innerHTML = "";
  const items = data.plan || data.schedule || data.content_plan || data.days || data.posts || [];

  if (Array.isArray(items)) {
    items.forEach((item, i) => {
      const card = document.createElement("div");
      card.className = "cal-day-card";
      const day = item.date_label || item.day || item.date || `Day ${i + 1}`;
      const type = item.content_type || item.type || item.format || "Post";
      const topic = item.topic || item.title || item.hook || item.content || "";
      const hook = item.hook || item.opening_line || "";
      card.innerHTML = `
        <div class="cal-day-head">
          <span class="cal-day-num">${day}</span>
          <span class="cal-day-type">${type}</span>
        </div>
        <p class="cal-day-topic">${escapeHTML(topic)}</p>
        ${hook ? `<p class="cal-day-hook">"${escapeHTML(hook)}"</p>` : ""}
      `;
      el.calendarGrid.appendChild(card);
    });
  } else {
    el.calendarGrid.innerHTML = `<pre class="strategy-raw">${escapeHTML(JSON.stringify(data, null, 2))}</pre>`;
  }
  if (window.lucide) lucide.createIcons();
}

function copyCalendarText() {
  const cards = el.calendarGrid.querySelectorAll(".cal-day-card");
  const lines = [];
  cards.forEach(card => {
    const day  = card.querySelector(".cal-day-num")?.textContent || "";
    const type = card.querySelector(".cal-day-type")?.textContent || "";
    const topic = card.querySelector(".cal-day-topic")?.textContent || "";
    const hook = card.querySelector(".cal-day-hook")?.textContent || "";
    lines.push(`${day} [${type}]: ${topic}${hook ? "\n  Hook: " + hook : ""}`);
  });
  navigator.clipboard.writeText(lines.join("\n\n"));
  showToast("Calendar copied", "success");
}

// ── STRATEGY BUILDER ──────────────────────────────────────────────
async function handleGenerateStrategy() {
  const niche = el.stratNiche.value.trim();
  const audience = el.stratAudience.value.trim();
  if (!niche) { showToast("Enter your niche first", "warning"); return; }

  await runLoader(4000);

  try {
    const res = await fetch(`${API_BASE}/api/plan/strategy`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-groq-key": state.groqKey },
      body: JSON.stringify({
        goal: el.stratGoal.value,
        platform: el.stratPlatform.value,
        niche,
        audience: audience || "General audience",
        timeframe: el.stratTimeframe.value
      })
    });
    if (!res.ok) throw new Error();
    const data = await res.json();

    el.strategyEmpty.classList.add("hidden");
    el.strategyResult.classList.remove("hidden");
    renderStrategy(data);
    showToast("Strategy built", "success");
  } catch {
    showToast("Strategy generation failed", "error");
  }
}

function renderStrategy(data) {
  el.strategyContent.innerHTML = "";

  // Support structured format returned by backend
  if (data.growth_strategy || data.weekly_objectives || data.content_pillars || data.posting_frequency || data.kpis || data.quick_wins) {
    if (data.growth_strategy) {
      const summaryBlock = document.createElement("div");
      summaryBlock.className = "strategy-phase";
      summaryBlock.innerHTML = `
        <div class="strategy-phase-head">
          <span class="strategy-phase-title">Growth Strategy Executive Summary</span>
        </div>
        <p class="strategy-raw">${escapeHTML(data.growth_strategy)}</p>
      `;
      el.strategyContent.appendChild(summaryBlock);
    }

    if (data.posting_frequency) {
      const freqBlock = document.createElement("div");
      freqBlock.className = "strategy-phase";
      freqBlock.innerHTML = `
        <div class="strategy-phase-head">
          <span class="strategy-phase-title">Posting Frequency</span>
        </div>
        <p class="strategy-raw">${escapeHTML(data.posting_frequency)}</p>
      `;
      el.strategyContent.appendChild(freqBlock);
    }

    if (Array.isArray(data.weekly_objectives) && data.weekly_objectives.length > 0) {
      const objBlock = document.createElement("div");
      objBlock.className = "strategy-phase";
      objBlock.innerHTML = `
        <div class="strategy-phase-head">
          <span class="strategy-phase-title">Weekly Objectives</span>
        </div>
        <ul class="strategy-tactics">${data.weekly_objectives.map(o => `<li>${escapeHTML(o)}</li>`).join("")}</ul>
      `;
      el.strategyContent.appendChild(objBlock);
    }

    if (Array.isArray(data.content_pillars) && data.content_pillars.length > 0) {
      const pillarsBlock = document.createElement("div");
      pillarsBlock.className = "strategy-phase";
      pillarsBlock.innerHTML = `
        <div class="strategy-phase-head">
          <span class="strategy-phase-title">Content Pillars</span>
        </div>
        <ul class="strategy-tactics">${data.content_pillars.map(p => `<li>${escapeHTML(p)}</li>`).join("")}</ul>
      `;
      el.strategyContent.appendChild(pillarsBlock);
    }

    if (Array.isArray(data.quick_wins) && data.quick_wins.length > 0) {
      const winsBlock = document.createElement("div");
      winsBlock.className = "strategy-phase";
      winsBlock.innerHTML = `
        <div class="strategy-phase-head">
          <span class="strategy-phase-title">Quick Wins</span>
        </div>
        <ul class="strategy-tactics">${data.quick_wins.map(w => `<li>${escapeHTML(w)}</li>`).join("")}</ul>
      `;
      el.strategyContent.appendChild(winsBlock);
    }

    if (Array.isArray(data.kpis) && data.kpis.length > 0) {
      const kpisBlock = document.createElement("div");
      kpisBlock.className = "strategy-phase";
      kpisBlock.innerHTML = `
        <div class="strategy-phase-head">
          <span class="strategy-phase-title">Key Performance Indicators (KPIs)</span>
        </div>
        <ul class="strategy-tactics">${data.kpis.map(k => `<li>${escapeHTML(k)}</li>`).join("")}</ul>
      `;
      el.strategyContent.appendChild(kpisBlock);
    }
  } else {
    // Fallback: render segments if vorhanden
    const sections = data.phases || data.sections || data.strategy_phases || data.weeks || [];
    if (Array.isArray(sections) && sections.length > 0) {
      sections.forEach(phase => {
        const block = document.createElement("div");
        block.className = "strategy-phase";
        const title = phase.phase || phase.title || phase.week || phase.name || "Phase";
        const focus = phase.focus || phase.goal || phase.objective || "";
        const tactics = phase.tactics || phase.actions || phase.content_types || phase.activities || [];

        block.innerHTML = `
          <div class="strategy-phase-head">
            <span class="strategy-phase-title">${escapeHTML(String(title))}</span>
            ${focus ? `<span class="strategy-phase-focus">${escapeHTML(focus)}</span>` : ""}
          </div>
          ${tactics.length ? `<ul class="strategy-tactics">${tactics.slice(0, 6).map(t => `<li>${escapeHTML(typeof t === "string" ? t : t.action || JSON.stringify(t))}</li>`).join("")}</ul>` : ""}
        `;
        el.strategyContent.appendChild(block);
      });
    } else {
      // Fallback: render as formatted text
      const summary = data.summary || data.overview || data.executive_summary || "";
      const keyStrategies = data.key_strategies || data.pillars || data.recommendations || [];

      if (summary) {
        const p = document.createElement("p");
        p.className = "strategy-raw";
        p.textContent = summary;
        el.strategyContent.appendChild(p);
      }
      if (keyStrategies.length) {
        const ul = document.createElement("ul");
        ul.className = "strategy-tactics";
        keyStrategies.forEach(s => {
          const li = document.createElement("li");
          li.textContent = typeof s === "string" ? s : s.strategy || s.title || JSON.stringify(s);
          ul.appendChild(li);
        });
        el.strategyContent.appendChild(ul);
      }
      if (!summary && !keyStrategies.length) {
        el.strategyContent.innerHTML = `<pre class="strategy-raw">${escapeHTML(JSON.stringify(data, null, 2))}</pre>`;
      }
    }
  }
  if (window.lucide) lucide.createIcons();
}

// ── IDEA GENERATOR ────────────────────────────────────────────────
async function handleGenerateIdeas() {
  const niche = el.ideaNiche.value.trim();
  if (!niche) { showToast("Enter your niche first", "warning"); return; }

  await runLoader(3000);

  try {
    const res = await fetch(`${API_BASE}/api/inspiration/ideas`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-groq-key": state.groqKey },
      body: JSON.stringify({
        niche,
        platform: el.ideaPlatform.value,
        audience: el.ideaAudience.value || "general",
        count: parseInt(el.ideaCount.value)
      })
    });
    if (!res.ok) throw new Error();
    const data = await res.json();

    el.ideasEmpty.classList.add("hidden");
    el.ideasResult.classList.remove("hidden");
    renderIdeas(data);
    showToast("Ideas generated", "success");
  } catch {
    showToast("Idea generation failed", "error");
  }
}

function renderIdeas(data) {
  el.ideasGrid.innerHTML = "";
  const ideas = data.ideas || data.content_ideas || data.topics || (Array.isArray(data) ? data : []);

  ideas.forEach((idea, i) => {
    const card = document.createElement("div");
    card.className = "idea-card";
    const title = idea.title || idea.topic || idea.hook || (typeof idea === "string" ? idea : `Idea ${i + 1}`);
    const hook  = idea.hook || idea.opening_line || "";
    const why   = idea.why_it_works || idea.rationale || idea.virality_reason || "";
    const type  = idea.content_type || idea.format || idea.type || "";

    card.innerHTML = `
      <div class="idea-card-num">${String(i + 1).padStart(2, "0")}</div>
      <div class="idea-card-body">
        <p class="idea-title">${escapeHTML(title)}</p>
        ${type ? `<span class="idea-type-badge">${escapeHTML(type)}</span>` : ""}
        ${hook ? `<p class="idea-hook">"${escapeHTML(hook)}"</p>` : ""}
        ${why  ? `<p class="idea-why">${escapeHTML(why)}</p>` : ""}
      </div>
      <button class="idea-use-btn" title="Use this idea">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </button>
    `;

    card.querySelector(".idea-use-btn").addEventListener("click", () => {
      el.genTopic.value = title;
      toggleStudioPanel("generate");
      navigateTo("pane-create");
      showToast("Idea loaded into Studio", "info");
    });

    el.ideasGrid.appendChild(card);
  });
}

// ── CONTENT BREAKDOWN ─────────────────────────────────────────────
async function handleBreakdown() {
  const content = el.breakdownContent.value.trim();
  if (!content) { showToast("Paste content to analyze first", "warning"); return; }

  await runLoader(3000);

  try {
    const res = await fetch(`${API_BASE}/api/inspiration/breakdown`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-groq-key": state.groqKey },
      body: JSON.stringify({ content, platform: el.breakdownPlatform.value })
    });
    if (!res.ok) throw new Error();
    const data = await res.json();

    el.breakdownEmpty.classList.add("hidden");
    el.breakdownResult.classList.remove("hidden");
    renderBreakdown(data);
    showToast("Breakdown complete", "success");
  } catch {
    showToast("Breakdown failed — check API key", "error");
  }
}

function renderBreakdown(data) {
  el.breakdownContent2.innerHTML = "";

  const sections = [
    { key: "hook_analysis", label: "🎣 Hook Formula", icon: "anchor" },
    { key: "emotional_triggers", label: "❤️ Emotional Triggers", icon: "heart" },
    { key: "structure", label: "📐 Content Structure", icon: "layers" },
    { key: "virality_factors", label: "⚡ Virality Factors", icon: "zap" },
    { key: "cta_technique", label: "📢 CTA Technique", icon: "megaphone" },
    { key: "takeaways", label: "💡 What You Can Steal", icon: "lightbulb" },
  ];

  sections.forEach(sec => {
    const val = data[sec.key];
    if (!val) return;
    const block = document.createElement("div");
    block.className = "breakdown-block";
    const content = Array.isArray(val) ? `<ul class="strategy-tactics">${val.map(v => `<li>${escapeHTML(typeof v === "string" ? v : JSON.stringify(v))}</li>`).join("")}</ul>` : `<p class="strategy-raw">${escapeHTML(typeof val === "string" ? val : JSON.stringify(val))}</p>`;
    block.innerHTML = `<div class="breakdown-block-head"><span>${sec.label}</span></div>${content}`;
    el.breakdownContent2.appendChild(block);
  });

  // Fallback if no known keys matched
  if (el.breakdownContent2.innerHTML === "") {
    el.breakdownContent2.innerHTML = `<pre class="strategy-raw">${escapeHTML(JSON.stringify(data, null, 2))}</pre>`;
  }
}


