/**
 * Lightweight bilingual (EN/DE) UI layer.
 *
 * Usage:
 *   - Mark translatable text in HTML with `data-i18n="keyName"` — the content
 *     in the tag is treated as the English fallback.
 *   - Mark translatable attributes with `data-i18n-attr="attr:key;attr:key"`
 *     (currently only used for `alt` / `aria-label`).
 *   - Call `I18n.setLanguage('de')` to switch; the choice is persisted to
 *     localStorage and restored on reload.
 */

const TRANSLATIONS = {
    en: {
        /* ---- Start screen ---- */
        title: 'Sharkie',
        subtitle: 'Join Sharkie on an adventure through the depths of the ocean!',
        startBtn: 'Start Game',
        controlsBtn: 'Controls',
        creditsBtn: 'Credits',
        privacyBtn: 'Privacy Policy',
        impressumBtn: 'Legal Notice',
        langToggle: '🇩🇪 Deutsch',

        /* ---- Overlay ---- */
        rotateMsg: 'Please rotate your device to landscape to play.',

        /* ---- Dialogs ---- */
        close: '✕ Close',

        controlsTitle: 'CONTROLS',
        movement: 'Movement',
        moveSharkie: 'Move Sharkie',
        attacks: 'Attacks',
        bubbleAttack: 'Bubble Attack',
        finSlap: 'Fin Slap',

        creditsTitle: 'CREDITS',
        aGameBy: 'A Game By',
        creditsAuthorNote: 'Developed as part of the Developer Academy Challenge',
        creditsContact: 'Contact',
        ideaHeading: 'Idea & Concept',
        ideaBody: 'A friendly shark on an adventure through the depths of the ocean.',
        thanksHeading: 'Special Thanks',
        thanksDA: 'Developer Academy Team',
        thanksCommunity: 'Community Feedback',
        thanksPlayers: 'All Players & Testers',
        musicHeading: '🎵 Music & Sound',
        musicBody: 'All sound effects are from royalty-free sources (Pixabay / Mixkit).',

        privacyTitle: 'PRIVACY POLICY',
        privacyDataHeading: 'Data & Privacy',
        privacyDataBody: 'This game does <strong>not</strong> collect, store or transmit any personal data from players. No login, cookies, analytics or tracking technologies are used by the game itself.',
        privacyLocalHeading: 'Local Data',
        privacyLocalBody: "Any local data (e.g. settings, volume) is stored only in your browser's localStorage and is used solely to remember your preferences on this device. You can clear it anytime via your browser settings.",
        privacyAudioHeading: 'Audio & Third-Party Assets',
        privacyAudioBody: 'Sounds and music included are licensed from royalty-free providers (e.g. Pixabay, Mixkit) or are original assets. Third-party libraries, if any, are used only for UI/helpers and do not collect user data.',
        privacyContactHeading: 'Contact',
        privacyContactBody: 'If you have questions or requests concerning privacy, please contact:',

        impressumTitle: 'LEGAL NOTICE',
        impressumCreatedBy: 'Created By',
        impressumPurposeHeading: 'Purpose',
        impressumPurposeBody: 'This project was created for educational purposes as part of the Developer Academy training program.',
        impressumAssetsHeading: 'Assets & Copyright',
        impressumAssetsBody: 'Graphics and sounds are from royalty-free sources (Pixabay, Mixkit). All content is used for educational purposes only.',

        /* ---- End screens ---- */
        gameOver: 'GAME OVER',
        restartBtn: 'Restart Game',
        mainMenuBtn: 'Main Menu'
    },
    de: {
        title: 'Sharkie',
        subtitle: 'Begleite Sharkie auf einem Abenteuer durch die Tiefen des Ozeans!',
        startBtn: 'Spiel starten',
        controlsBtn: 'Steuerung',
        creditsBtn: 'Credits',
        privacyBtn: 'Datenschutz',
        impressumBtn: 'Impressum',
        langToggle: '🇬🇧 English',

        rotateMsg: 'Bitte drehe dein Gerät ins Querformat, um zu spielen.',

        close: '✕ Schließen',

        controlsTitle: 'STEUERUNG',
        movement: 'Bewegung',
        moveSharkie: 'Sharkie bewegen',
        attacks: 'Angriffe',
        bubbleAttack: 'Blasen-Angriff',
        finSlap: 'Flossenschlag',

        creditsTitle: 'CREDITS',
        aGameBy: 'Ein Spiel von',
        creditsAuthorNote: 'Entwickelt im Rahmen der Developer Academy Challenge',
        creditsContact: 'Kontakt',
        ideaHeading: 'Idee & Konzept',
        ideaBody: 'Ein freundlicher Hai auf einem Abenteuer durch die Tiefen des Ozeans.',
        thanksHeading: 'Besonderer Dank',
        thanksDA: 'Das Team der Developer Academy',
        thanksCommunity: 'Community-Feedback',
        thanksPlayers: 'Alle Spieler & Tester',
        musicHeading: '🎵 Musik & Sound',
        musicBody: 'Alle Sound-Effekte stammen aus lizenzfreien Quellen (Pixabay / Mixkit).',

        privacyTitle: 'DATENSCHUTZ',
        privacyDataHeading: 'Daten & Datenschutz',
        privacyDataBody: 'Dieses Spiel sammelt, speichert und überträgt <strong>keine</strong> personenbezogenen Daten von Spielerinnen und Spielern. Es werden weder Login, Cookies noch Analyse- oder Tracking-Technologien verwendet.',
        privacyLocalHeading: 'Lokale Daten',
        privacyLocalBody: 'Lokale Daten (z. B. Einstellungen, Lautstärke) werden ausschließlich im localStorage deines Browsers gespeichert und dienen nur dazu, deine Präferenzen auf diesem Gerät zu erinnern. Du kannst sie jederzeit in deinen Browsereinstellungen löschen.',
        privacyAudioHeading: 'Audio & Drittanbieter-Assets',
        privacyAudioBody: 'Enthaltene Sounds und Musik stammen von lizenzfreien Anbietern (z. B. Pixabay, Mixkit) oder sind Eigenkreationen. Etwaige Drittanbieter-Bibliotheken werden nur für UI/Helfer verwendet und erfassen keine Nutzerdaten.',
        privacyContactHeading: 'Kontakt',
        privacyContactBody: 'Bei Fragen oder Anliegen zum Datenschutz wende dich bitte an:',

        impressumTitle: 'IMPRESSUM',
        impressumCreatedBy: 'Erstellt von',
        impressumPurposeHeading: 'Zweck',
        impressumPurposeBody: 'Dieses Projekt wurde zu Ausbildungszwecken im Rahmen des Ausbildungsprogramms der Developer Academy erstellt.',
        impressumAssetsHeading: 'Assets & Urheberrecht',
        impressumAssetsBody: 'Grafiken und Sounds stammen aus lizenzfreien Quellen (Pixabay, Mixkit). Alle Inhalte werden ausschließlich zu Ausbildungszwecken verwendet.',

        gameOver: 'GAME OVER',
        restartBtn: 'Neu starten',
        mainMenuBtn: 'Hauptmenü'
    }
};

const I18n = {
    lang: localStorage.getItem('lang') || 'en',

    /**
     * Resolve a translation key. Falls back to the key itself if missing.
     * @param {string} key
     * @returns {string}
     */
    t(key) {
        return TRANSLATIONS[this.lang]?.[key] ?? TRANSLATIONS.en[key] ?? key;
    },

    /**
     * Switch the active language and re-render every translated node.
     * @param {'en' | 'de'} lang
     */
    setLanguage(lang) {
        this.lang = lang;
        localStorage.setItem('lang', lang);
        this.apply();
    },

    /**
     * Re-render every `[data-i18n]` and `[data-i18n-html]` node.
     * Also updates `<html lang>` so screen readers and browsers can adjust.
     */
    apply() {
        document.documentElement.lang = this.lang;

        document.querySelectorAll('[data-i18n]').forEach(el => {
            el.textContent = this.t(el.dataset.i18n);
        });

        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            el.innerHTML = this.t(el.dataset.i18nHtml);
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    I18n.apply();
    const toggle = document.getElementById('lang-toggle');
    if (toggle) {
        toggle.addEventListener('click', () => {
            I18n.setLanguage(I18n.lang === 'en' ? 'de' : 'en');
        });
    }
});
