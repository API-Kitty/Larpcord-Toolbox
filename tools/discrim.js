// Larpcord - https://github.com/API-Kitty/Larpcord-Toolbox
// Larping the old Discriminator Tag
// Credits: @demiomad.

let _mods = webpackChunkdiscord_app.push([[Symbol()],{},r=>r.c]);
webpackChunkdiscord_app.pop();

let findByProps = (...props) => {
    for (let m of Object.values(_mods)) {
        try {
            if (!m.exports || m.exports === window) continue;
            if (props.every((x) => m.exports?.[x])) return m.exports;

            for (let ex in m.exports) {
                if (props.every((x) => m.exports?.[ex]?.[x]) && m.exports[ex][Symbol.toStringTag] !== 'IntlMessagesProxy') return m.exports[ex];
            }
        } catch {}
    }
}

const user = findByProps("getCurrentUser").getCurrentUser();

if (!user)
    console.error("Failed to get current user");
else
    user.discriminator = String(Math.floor(Math.random() * 9999) + 1).padStart(4, "0");
