import RoleAction from "@pages/RoleAction";
import HomePage from "@pages/homepage";
import NhanSu from "@pages/Nhansu";
import HoTro from "@pages/Hotro";
import Menu from "@pages/Menu";
import Unit from "@pages/Unit";
import Customer from "@pages/Customer";
import User from "@pages/User";
import Hopdong from "@pages/Hopdong";
import Diaban from "@pages/Diaban";
import Duan from "@pages/Duan";
import Donvi from "@pages/Unit";
import File_khachhang from "../components/pages/File";
import Group from "../components/pages/Group";
import Member from "../components/pages/Member";
import ChangePassword from "../components/pages/Modal/ChangePassword";
import ViewProfile from "../components/pages/Modal/ViewProfile";
import ok from "../components/common/ok";
import Hoadon from "../components/pages/Quanly_hoadon";
import Half from "@pages/Half";
import NhatkyHopdong from "@pages/NhatkyHopdong";
import Chat from "@pages/Chat";
import Approved from "@pages/Approved";
import Notification from "@pages/Notification";
import ChamCong from "@pages/ChamCong";
import Search from "@pages/Search";

const routers = [
  {
    path: "/member",
    component: Member,
    name: "member",
  },
  {
    path: "/",
    component: HomePage,
    name: "homepage",
  },
  {
    path: "/role",
    component: RoleAction,
    name: "quản lý quyền",
  },
  {
    path: "/user",
    component: User,
    name: "user",
  },
  {
    path: "/nhansu",
    component: NhanSu,
    name: "nhansu",
  },
  {
    path: "/hotro",
    component: HoTro,
    name: "hotro",
  },
  {
    path: "/menu",
    component: Menu,
    name: "menu",
  },
  {
    path: "/unit",
    component: Unit,
    name: "unit",
  },
  {
    path: "/khachhang",
    component: Customer,
    name: "khachhang",
  },
  {
    path: "/hopdong",
    component: Hopdong,
    name: "Hopdong",
  },
  {
    path: "/diaban",
    component: Diaban,
    name: "Diaban",
  },
  {
    path: "/duan",
    component: Duan,
    name: "Duan",
  },
  {
    path: "/donvi",
    component: Donvi,
    name: "donvi",
  },
  {
    path: "/qlhd",
    component: Hoadon,
    name: "hoadon",
  },
  {
    path: "/file",
    component: File_khachhang,
    name: "file_khachhangs",
  },
  {
    path: "/group",
    component: Group,
    name: "Group",
  },
  {
    path: "/changepassword",
    component: ChangePassword,
    name: "changepassword",
  },
  {
    path: "/viewprofile",
    component: ViewProfile,
    name: "viewprofile",
  },
  {
    path: "/ok",
    component: ok,
    name: "ok",
  },
  {
    path: "/half",
    component: Half,
    name: "Half",
  },
  {
    path: "/nkhd",
    component: NhatkyHopdong,
    name: "NhatkyHopdong",
  },
  {
    path: "/chat",
    component: Chat,
    name: "Chat",
  },
  {
    path: "/approved",
    component: Approved,
    name: "Approved",
  },
  {
    path: "/notification",
    component: Notification,
    name: "Notification",
  },
  {
    path: "/chamcong",
    component: ChamCong,
    name: "ChamCong",
  },
  {
    path: "/search",
    component: Search,
    name: "Search",
  },
];

export default routers;
