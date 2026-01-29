// ============================================
// Repertoire Page JavaScript
// Search, filter, and display functionality for Basque songbook
// ============================================

(function() {
    'use strict';

    // DOM Elements
    const searchInput = document.getElementById('searchInput');
    const clearBtn = document.getElementById('clearSearch');
    const songsContainer = document.getElementById('songsContainer');
    const noResults = document.getElementById('noResults');
    const resultCount = document.getElementById('resultCount');
    const modal = document.getElementById('songModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalArtist = document.getElementById('modalArtist');
    const modalLyrics = document.getElementById('modalLyrics');
    const modalClose = modal.querySelector('.modal-close');
    const modalOverlay = modal.querySelector('.modal-overlay');

    // State
    let searchTimeout;
    let currentSongs = [...repertoireData];

    // Initialize
    function init() {
        displayResults(currentSongs);
        attachEventListeners();
        updateResultCount(currentSongs.length);
    }

    // Event Listeners
    function attachEventListeners() {
        // Search input with debouncing
        searchInput.addEventListener('input', handleSearch);

        // Clear search button
        clearBtn.addEventListener('click', clearSearch);

        // Modal close events
        modalClose.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', closeModal);

        // ESC key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                closeModal();
            }
        });
    }

    // Handle search input
    function handleSearch(e) {
        const query = e.target.value;

        // Show/hide clear button
        if (query.length > 0) {
            clearBtn.classList.remove('hidden');
        } else {
            clearBtn.classList.add('hidden');
        }

        // Debounce search
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 300);
    }

    // Perform search
    function performSearch(query) {
        if (!query.trim()) {
            currentSongs = [...repertoireData];
            displayResults(currentSongs);
            updateResultCount(currentSongs.length);
            return;
        }

        const normalizedQuery = normalizeText(query.toLowerCase());

        currentSongs = repertoireData.filter(song => {
            const searchableText = `${song.title} ${song.artist} ${song.lyrics}`.toLowerCase();
            const normalizedText = normalizeText(searchableText);
            return normalizedText.includes(normalizedQuery);
        });

        displayResults(currentSongs);
        updateResultCount(currentSongs.length);
    }

    // Clear search
    function clearSearch() {
        searchInput.value = '';
        clearBtn.classList.add('hidden');
        currentSongs = [...repertoireData];
        displayResults(currentSongs);
        updateResultCount(currentSongs.length);
        searchInput.focus();
    }

    // Display results
    function displayResults(songs) {
        if (songs.length === 0) {
            songsContainer.classList.add('hidden');
            noResults.classList.remove('hidden');
            return;
        }

        songsContainer.classList.remove('hidden');
        noResults.classList.add('hidden');

        songsContainer.innerHTML = songs.map(song => createSongCard(song)).join('');

        // Attach click handlers to all cards
        attachCardClickHandlers();
    }

    // Create song card HTML
    function createSongCard(song) {
        // Get preview text (first 100 characters of lyrics)
        const preview = song.lyrics.length > 100
            ? song.lyrics.substring(0, 100) + '...'
            : song.lyrics;

        return `
            <div class="song-card" data-song-id="${song.id}">
                <h3 class="song-title">${escapeHtml(song.title)}</h3>
                <p class="song-artist">${escapeHtml(song.artist)}</p>
                <p class="song-preview">${escapeHtml(preview)}</p>
                <button class="btn-view-lyrics" data-i18n="repertoire.viewLyrics">Voir les paroles</button>
            </div>
        `;
    }

    // Attach click handlers to song cards
    function attachCardClickHandlers() {
        const cards = document.querySelectorAll('.song-card');
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                const songId = card.getAttribute('data-song-id');
                const song = repertoireData.find(s => s.id === songId);
                if (song) {
                    openModal(song);
                }
            });
        });
    }

    // Open modal with song lyrics
    function openModal(song) {
        modalTitle.textContent = song.title;
        modalArtist.textContent = song.artist;
        modalLyrics.textContent = song.lyrics;

        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    // Close modal
    function closeModal() {
        modal.classList.add('hidden');
        document.body.style.overflow = ''; // Re-enable scrolling
    }

    // Update result count
    function updateResultCount(count) {
        const currentLang = document.documentElement.getAttribute('data-lang') || 'fr';

        // Get translation for "songs" in current language
        let countText;
        if (typeof translations !== 'undefined' && translations[currentLang] && translations[currentLang].repertoire) {
            const template = translations[currentLang].repertoire.songsCount || '{count} chanson(s)';
            countText = template.replace('{count}', count);
        } else {
            countText = `${count} chanson${count !== 1 ? 's' : ''}`;
        }

        resultCount.textContent = countText;
    }

    // Normalize text for better search (handle accented characters)
    function normalizeText(text) {
        return text
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
            .replace(/[áàä]/g, 'a')
            .replace(/[éèë]/g, 'e')
            .replace(/[íìï]/g, 'i')
            .replace(/[óòö]/g, 'o')
            .replace(/[úùü]/g, 'u')
            .replace(/ñ/g, 'n');
    }

    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Re-translate UI when language changes
    window.addEventListener('languageChanged', () => {
        updateResultCount(currentSongs.length);

        // Re-translate "view lyrics" buttons
        const viewButtons = document.querySelectorAll('.btn-view-lyrics');
        const currentLang = document.documentElement.getAttribute('data-lang') || 'fr';
        if (typeof translations !== 'undefined' && translations[currentLang] && translations[currentLang].repertoire) {
            const buttonText = translations[currentLang].repertoire.viewLyrics || 'Voir les paroles';
            viewButtons.forEach(btn => {
                btn.textContent = buttonText;
            });
        }
    });

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
