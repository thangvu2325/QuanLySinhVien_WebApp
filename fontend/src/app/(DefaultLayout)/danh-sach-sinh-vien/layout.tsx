import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Danh Sách Sinh Viên",
  description: "Phần mềm quản lý sinh viên",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
