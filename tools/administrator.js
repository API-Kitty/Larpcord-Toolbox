// Larpcord - https://github.com/API-Kitty/Larpcord-Toolbox
// Larping Server Administrator | View *most* of any Server Configuration. (on any server)
// Credits: @davr1
window.findStore??=name=>(window.Flux??=webpackChunkdiscord_app.push([[Symbol()],,e=>e.b&&Object.values(e.c).values().map(m=>m.exports).filter(x=>typeof x=="object"&&x!=window&&x!=DOMTokenList.prototype).flatMap(x=>[x,...Object.values(x)]).find(x=>x?.Store?.prototype)])).Store.getAll().find(s=>s.getName()===name);

const PermissionStore = findStore("PermissionStore");
const UserStore = findStore("UserStore");
const GuildStore = findStore("GuildStore");

const setProtoFields = (obj, fields, value) => fields.forEach(field => Object.getPrototypeOf(obj)[field] = value);

const permissionProps = Object.fromEntries(Object.keys(PermissionStore.getGuildPermissionProps({ id: 0 })).map(key => [key, true]))

setProtoFields(PermissionStore, ["getGuildPermissions", "getChannelPermissions", "computePermissions", "computeBasicPermissions"], () => ~0n);
setProtoFields(PermissionStore, ["getGuildPermissionProps"], guild => ({ ...permissionProps, guild }));
setProtoFields(PermissionStore, ["can", "canAccessGuildSettings", "canAccessMemberSafetyPage", "canBasicChannel", "canImpersonateRole", "canManageUser", "canWithPartialContext", "isRoleHigher"], () => true);
PermissionStore.emitChange();

GuildStore.addChangeListener(() => GuildStore.getGuildsArray().forEach(g => g.ownerId = UserStore.getCurrentUser().id));
GuildStore.emitChange();
