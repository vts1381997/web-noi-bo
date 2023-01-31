module.exports = [
  {
    url: "/user/get",
    claim: "USER.READ",
  },
  {
    url: "/user/search",
    claim: "USER.READ",
  },
  {
    url: "/user/insert",
    claim: "USER.INSERT",
  },
  {
    url: "/user/update",
    claim: "USER.UPDATE",
  },
  {
    url: "/user/delete",
    claim: "USER.DELETE",
  },
  {
    url: "/user/checkrole",
    claim: "ADMIN.INSERT",
  },
  {
    url: "/setpermission",
    claim: "ROLE.PERMISISON",
  },
  {
    url: "/role_action/insert",
    claim: "ROLE.INSERT",
  },
  {
    url: "/role_action/actionInsert",
    claim: "ROLE.INSERT",
  },
  {
    url: "/role_action/roleInsert",
    claim: "ROLE.INSERT",
  },
  {
    url: "/role_action/getRoleCode",
    claim: "ROLE.INSERT",
  },
  {
    url: "/role_action/getRoleAction",
    claim: "ROLE.INSERT",
  },
  {
    url: "/role_action/update",
    claim: "ROLE.UPDATE",
  },
  {
    url: "/role_action/delete",
    claim: "ROLE.DELETE",
  },
  {
    url: "/role_action/get",
    claim: "ROLE.READ",
  },
];