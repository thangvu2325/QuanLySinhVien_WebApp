import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thêm Sinh Viên",
  description: "Phần mềm quản lý sinh viên",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
