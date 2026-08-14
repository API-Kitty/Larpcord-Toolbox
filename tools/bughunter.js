// Larpcord - https://github.com/API-Kitty/Larpcord-Toolbox
// Larping Bug Hunter Badge 0.1

function addBadges(badges, insertAtIndex = null) {
    const store = Vencord.Webpack.findStore("UserProfileStore");
    const original = store.getUserProfile;

    store.getUserProfile = function (userId) {
        const profile = original.apply(this, arguments);
        const currentUser = Vencord.Webpack.Common.UserStore.getCurrentUser();

        if (profile && userId === currentUser?.id) {
            badges.forEach(({ id, description, icon, link }) => {
                const alreadyExists = profile.badges.some(b => b.id === id);
                if (!alreadyExists) {
                    const newBadge = { id, description, icon, link };

                    if (typeof insertAtIndex === "number") {
                        // Prevent out-of-bounds insert
                        const index = Math.min(insertAtIndex, profile.badges.length);
                        profile.badges.splice(index, 0, newBadge);
                    } else {
                        profile.badges.push(newBadge);
                    }
                }
            });
        }

        return profile;
    };
}

addBadges([
    {
        id: "bug_hunter_level_2",
        description: "Discord Bug Hunter",
        icon: "848f79194d4be5ff5f81505cbd0ce1e6",
        link: "https://support.discord.com/hc/en-us/articles/360046057772-Discord-Bugs"
    }
], 2);
