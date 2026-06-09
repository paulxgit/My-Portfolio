(function () {
    'use strict';

    const controls = [...document.querySelectorAll('.control')];
    const themeBtn = document.querySelector('.theme-btn');

    /* ── Restore saved theme ── */
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
    }

    /* ── Section navigation ── */
    function activateSection(id) {
        document.querySelector('.active-btn').classList.remove('active-btn');
        document.querySelector(`[data-id="${id}"]`).classList.add('active-btn');
        document.querySelector('.active').classList.remove('active');
        document.getElementById(id).classList.add('active');
    }

    controls.forEach(btn => {
        btn.addEventListener('click', function () {
            activateSection(this.dataset.id);
        });

        /* Keyboard: Enter or Space activates the control */
        btn.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                activateSection(this.dataset.id);
            }
        });
    });

    /* ── Arrow-key navigation between controls ── */
    document.addEventListener('keydown', function (e) {
        const current = controls.indexOf(document.querySelector('.active-btn'));
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            const next = controls[(current + 1) % controls.length];
            activateSection(next.dataset.id);
            next.focus();
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            const prev = controls[(current - 1 + controls.length) % controls.length];
            activateSection(prev.dataset.id);
            prev.focus();
        }
    });

    /* ── Theme toggle ── */
    function toggleTheme() {
        document.body.classList.toggle('light-mode');
        localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
    }

    themeBtn.addEventListener('click', toggleTheme);
    themeBtn.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleTheme();
        }
    });
})();
