/* ==========================================================================
   Skills for Children - Main JavaScript
   ========================================================================== */

// Toggle Pillar Accordion
function togglePillar(header) {
    const content = header.nextElementSibling;
    
    // Close all other pillars
    document.querySelectorAll('.pillar-content').forEach(c => {
        if (c !== content) c.classList.remove('active');
    });
    document.querySelectorAll('.pillar-header').forEach(h => {
        if (h !== header) h.classList.remove('active');
    });
    
    // Toggle current pillar
    content.classList.toggle('active');
    header.classList.toggle('active');
}

// Copy Link to Clipboard
function copyLink(url, button) {
    navigator.clipboard.writeText(url).then(function() {
        const originalText = button.innerHTML;
        button.innerHTML = '✓ Copied!';
        button.classList.add('copied');
        
        // Show toast notification
        const toast = document.getElementById('toast');
        if (toast) {
            toast.classList.add('show');
        }
        
        // Reset after 2 seconds
        setTimeout(function() {
            button.innerHTML = originalText;
            button.classList.remove('copied');
            if (toast) {
                toast.classList.remove('show');
            }
        }, 2000);
    }).catch(function(err) {
        console.error('Failed to copy:', err);
        alert('Failed to copy link. Please try again.');
    });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    // All pillars start collapsed - user clicks to expand
    console.log('Skills for Children site loaded');
    
    // Initialize search and filter
    initializeSearchAndFilter();
});

// Search and Filter Functionality
function initializeSearchAndFilter() {
    const searchInput = document.getElementById('resourceSearch');
    const audienceFilter = document.getElementById('audienceFilter');
    const formatFilter = document.getElementById('formatFilter');
    const sectionFilter = document.getElementById('sectionFilter');
    const clearButton = document.getElementById('clearFilters');
    const resultsCount = document.getElementById('resultsCount');
    
    if (!searchInput) return; // Exit if search elements don't exist
    
    // Filter resources function
    function filterResources() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedAudience = audienceFilter.value;
        const selectedFormat = formatFilter.value;
        const selectedSection = sectionFilter.value;
        
        const allResources = document.querySelectorAll('.resource-card-wrapper');
        const allPillars = document.querySelectorAll('.resource-pillar');
        
        let visibleCount = 0;
        
        // Filter each resource
        allResources.forEach(resource => {
            const audience = resource.getAttribute('data-audience');
            const format = resource.getAttribute('data-format');
            const section = resource.getAttribute('data-section');
            const title = resource.getAttribute('data-title') || '';
            const description = resource.getAttribute('data-description') || '';
            const source = resource.getAttribute('data-source') || '';
            
            // Check if resource matches all filters
            const matchesSearch = !searchTerm || 
                                  title.includes(searchTerm) || 
                                  description.includes(searchTerm) || 
                                  source.includes(searchTerm);
            const matchesAudience = !selectedAudience || audience === selectedAudience;
            const matchesFormat = !selectedFormat || format === selectedFormat;
            const matchesSection = !selectedSection || section === selectedSection;
            
            if (matchesSearch && matchesAudience && matchesFormat && matchesSection) {
                resource.classList.remove('hidden');
                visibleCount++;
            } else {
                resource.classList.add('hidden');
            }
        });
        
        // Hide/show pillars based on whether they have visible resources
        allPillars.forEach(pillar => {
            const pillarSection = pillar.getAttribute('data-section');
            const visibleResources = pillar.querySelectorAll('.resource-card-wrapper:not(.hidden)');
            
            // Check section filter
            if (selectedSection && pillarSection !== selectedSection) {
                pillar.style.display = 'none';
            } else if (visibleResources.length === 0) {
                pillar.style.display = 'none';
            } else {
                pillar.style.display = 'block';
                
                // Update pillar count
                const countBadge = pillar.querySelector('.pillar-count');
                if (countBadge) {
                    countBadge.textContent = `${visibleResources.length} resources`;
                }
            }
        });
        
        // Update results count
        if (searchTerm || selectedAudience || selectedFormat || selectedSection) {
            resultsCount.textContent = `Showing ${visibleCount} resource${visibleCount !== 1 ? 's' : ''}`;
        } else {
            resultsCount.textContent = '';
        }
    }
    
    // Clear all filters
    function clearFilters() {
        searchInput.value = '';
        audienceFilter.value = '';
        formatFilter.value = '';
        sectionFilter.value = '';
        filterResources();
    }
    
    // Event listeners
    searchInput.addEventListener('input', filterResources);
    audienceFilter.addEventListener('change', filterResources);
    formatFilter.addEventListener('change', filterResources);
    sectionFilter.addEventListener('change', filterResources);
    clearButton.addEventListener('click', clearFilters);
}
