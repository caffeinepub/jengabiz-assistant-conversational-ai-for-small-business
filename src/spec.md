# Specification

## Summary
**Goal:** Optimize application performance to eliminate UI hanging and add a persistent AI assistant button accessible from all pages.

**Planned changes:**
- Implement message virtualization and input debouncing in ChatPage to handle large chat histories smoothly
- Reduce AnimatedBackground canvas animation complexity with throttled frame rates and adaptive performance adjustments
- Add lazy loading for video thumbnails and pagination in VideoLearningPage
- Implement React.memo and useMemo optimizations across frequently re-rendered components
- Add a persistent floating AI assistant button in the bottom-right corner visible across all pages

**User-visible outcome:** The application responds instantly without lag or hanging, chat and video pages load quickly even with large amounts of content, and users can access the AI assistant from any page via a fixed floating button.
