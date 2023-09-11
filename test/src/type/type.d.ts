export interface IMenuItem {
  id: number;
  to: string;
  label: string;
}
export interface IMenuProp {
  title: string;
  data: IMenuItem[];
}
export interface IStudent {
  id?: number;
  mssv?: string;
  ho: string;
  ten_dem: string;
  ten: string;
  gioi_tinh: string;
  ten_lop: string;
  khoa?: number;
  so_dien_thoai?: string;
  ten_nganh: string;
}
export interface IClass {
  ma_lop?: number;
  ten_lop: string;
  khoa: number;
  ten_nganh: string;
  ngay_bat_dau: Date;
}
export interface IMajor {
  ma_nganh: number;
  ten_nganh: string;
}
