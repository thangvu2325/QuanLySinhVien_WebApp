import { FunctionComponent } from "react";
import className from "classnames/bind";
import styles from "./Table.module.scss";
import { IconTrash, IconEdit } from "@tabler/icons-react";
import { IStudent } from "@/type/type";
const cx = className.bind(styles);
interface TableProps {
  data: Array<IStudent>;
}

const Table: FunctionComponent<TableProps> = ({ data }) => {
  // const danh_sach_ten = [
  //   "Nguyễn Văn A",
  //   "Trần Thị B",
  //   "Lê Văn Dũng",
  //   "Phạm Thị Lan Anh",
  //   "Hoàng Văn Hùng",
  //   "Võ Thị Mai",
  //   "Đặng Văn Quyết",
  //   "Bùi Thị Hoa",
  //   "Đỗ Minh Trí",
  //   "Ngô Thị Thuý",
  //   "Lương Văn Nam",
  //   "Trịnh Thị Thúy",
  //   "Phan Văn Thắng",
  //   "Đinh Thị Ngọc",
  //   "Hồ Văn Tuấn",
  //   "Mai Thị Hương",
  //   "Nguyễn Minh Khai",
  //   "Vũ Thị Thanh",
  //   "Hà Văn Huy",
  //   "Nguyễn Thị Thu",
  //   "Trần Văn Thành",
  //   "Nguyễn Văn Tùng",
  //   "Đỗ Thị Hà",
  //   "Phạm Minh Tuấn",
  //   "Hoàng Thị Mai",
  //   "Lê Minh Hòa",
  //   "Vũ Văn Long",
  //   "Nguyễn Thị Ngọc Anh",
  //   "Trần Đình Quang",
  //   "Nguyễn Thị Thu Hà",
  //   "Lý Văn Hoàng",
  //   "Phan Thị Hồng",
  //   "Trương Văn Đức",
  //   "Nguyễn Văn Hòa",
  //   "Võ Minh Trí",
  //   "Lê Thị Thu",
  //   "Hoàng Văn Đức",
  //   "Phạm Thị Hương",
  //   "Đặng Văn Lâm",
  //   "Nguyễn Thị Hà",
  //   "Lê Thị Hồng",
  //   "Bùi Văn Tâm",
  //   "Trần Thị Mai",
  //   "Đinh Văn Hùng",
  //   "Vương Thị Thu",
  //   "Phan Văn Đức",
  //   "Trương Thị Hà",
  //   "Hoàng Minh Tuấn",
  //   "Vũ Thị Thu Hương",
  //   "Nguyễn Văn Quang",
  //   "Đặng Minh Hải",
  //   "Lê Văn Phương",
  //   "Nguyễn Thị Thảo",
  //   "Trần Minh Quân",
  //   "Hoàng Thị Loan",
  //   "Vũ Thị Thúy",
  //   "Nguyễn Đức Anh",
  //   "Lý Thị Thu Hà",
  //   "Phạm Văn Sơn",
  //   "Đỗ Thị Thu Trang",
  //   "Trần Văn Hùng",
  //   "Nguyễn Thị Thu Hương",
  //   "Lê Minh Quang",
  //   "Phan Văn Tài",
  //   "Vũ Thị Lan Anh",
  //   "Hoàng Thị Thúy",
  //   "Đinh Văn Dũng",
  //   "Bùi Thị Thu Hà",
  //   "Trần Minh Tuấn",
  //   "Lương Văn Thanh",
  //   "Nguyễn Thị Ngọc Mai",
  //   "Võ Văn Quân",
  //   "Đỗ Thị Bích Hằng",
  //   "Phạm Văn Hòa",
  //   "Trương Thị Thu",
  //   "Lê Văn Hiệp",
  //   "Nguyễn Thị Thu Thảo",
  //   "Trần Văn Tuấn",
  //   "Phan Thị Thu Hà",
  //   "Nguyễn Văn Khánh",
  //   "Hoàng Thị Hương",
  //   "Vũ Văn Tuấn",
  //   "Đặng Thị Thu Trang",
  //   "Nguyễn Thị Ngọc Diệp",
  //   "Lê Văn Tâm",
  //   "Trần Thị Quỳnh Anh",
  //   "Phạm Văn Thành",
  //   "Võ Thị Thanh Hà",
  //   "Nguyễn Văn Lợi",
  //   "Bùi Thị Thùy Linh",
  //   "Đỗ Thị Thanh Hà",
  //   "Trần Văn Tài",
  //   "Hoàng Thị Ngọc Ánh",
  //   "Lê Thị Thu Thảo",
  //   "Nguyễn Văn Hưng",
  //   "Vũ Thị Hương",
  //   "Phan Văn Đạo",
  //   "Đặng Thị Thu Hằng",
  //   "Trương Văn Tâm",
  //   "Nguyễn Thị Lan Anh",
  // ];
  // const nganh_hoc = [
  //   "Kinh doanh và Quản trị",
  //   "Công nghệ Thông tin",
  //   "Khoa học Máy tính",
  //   "Kỹ thuật Điện và Điện tử",
  //   "Y học và Y khoa",
  //   "Khoa học Xã hội (bao gồm Tâm lý, Khoa học Chính trị và Xã hội học)",
  //   "Toán học và Thống kê",
  //   "Khoa học Tự nhiên (bao gồm Hóa học, Vật lý và Sinh học)",
  //   "Nghệ thuật và Nghệ thuật biểu diễn",
  //   "Ngôn ngữ học và Văn học",
  //   "Kỹ thuật Cơ khí",
  //   "Kỹ thuật Xây dựng và Kiến trúc",
  //   "Kỹ thuật Hóa học",
  //   "Kỹ thuật Môi trường",
  //   "Quốc tế học và Ngoại giao",
  //   "Khoa học Mô phỏng và Thực nghiệm",
  //   "Nông nghiệp và Khoa học thực phẩm",
  //   "Khoa học Dữ liệu và Trí tuệ nhân tạo",
  //   "Khoa học Môi trường",
  //   "Khoa học Thể thao và Giải trí",
  // ];
  // for (let i = 0; i < 21; i++) {
  //   // console.log(
  //   //   `('${danh_sach_ten[i].split(" ")[0]}', '${
  //   //     danh_sach_ten[i].split(" ")[1]
  //   //   }', '${danh_sach_ten[i].split(" ")[2]}', ${i % 2 ? 1 : 0}, '${
  //   //     i % 20
  //   //   }', '0${(
  //   //     Math.floor(Math.random() * 900000000) + 100000000
  //   //   ).toString()}',  '${nganh_hoc[i % 20]}', ${Math.floor(
  //   //     Math.random() * 24
  //   //   )})`
  //   // );
  //   console.log(`('${nganh_hoc[i]}')`);
  // }
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
      <table
        className="w-full border-collapse bg-white text-left text-gray-500 "
        style={{ fontSize: "1.4rem" }}
      >
        <thead className="bg-sky-500 h-24">
          <tr style={{ color: "#fff" }}>
            <th scope="col" className="px-6 py-4 font-medium ">
              Sinh viên
            </th>
            <th scope="col" className="px-6 py-4 font-medium ">
              Mã Số Sinh Viên
            </th>
            <th scope="col" className="px-6 py-4 font-medium ">
              Số điện thoại
            </th>
            <th scope="col" className="px-6 py-4 font-medium ">
              Tình trạng học tập
            </th>
            <th scope="col" className="px-6 py-4 font-medium ">
              Khóa
            </th>
            <th scope="col" className="px-6 py-4 font-medium ">
              Ngành
            </th>
            <th scope="col" className="px-6 py-4 font-medium "></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {/* <tr className="hover:bg-gray-50">
            <th className="flex gap-3 px-6 py-4 font-maximum text-gray-900">
              Vũ Đức Thắng
            </th>
            <td className="px-6 py-4">20119287</td>
            <td className="px-6 py-4">0395177093</td>
            <td className="px-6 py-4">thangvu2325@gmail.com</td>
            <td className="px-6 py-4">
              <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 font-semibold text-green-600">
                <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                Còn học
              </span>
            </td>
            <td className="px-6 py-4">K20</td>
            <td className="px-6 py-4">
              <div className="flex gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 font-semibold text-blue-600">
                  Chất lượng cao
                </span>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 font-semibold text-blue-600">
                  Công nghệ kỹ thuật máy tính
                </span>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex justify-end gap-4">
                <a x-data="{ tooltip: 'Delete' }" href="#">
                  <IconTrash width={25} height={25} stroke={2} />
                </a>
                <a
                  x-data="{ tooltip: 'Edite' }"
                  href="#"
                  style={{ marginLeft: "20px" }}
                >
                  <IconEdit width={25} height={25} stroke={2} />
                </a>
              </div>
            </td>
          </tr> */}
          {data.length
            ? data
                .sort((a, b) => a.ten.localeCompare(b.ten))
                .splice(0, 20)
                .map((student) => (
                  <tr className="hover:bg-gray-50" key={student.id}>
                    <th className="flex gap-3 px-6 py-4 font-maximum text-gray-900">
                      {`${student.ho} ${student.ten_dem} ${student.ten}`}
                    </th>
                    <td className="px-6 py-4">{student.mssv}</td>
                    <td className="px-6 py-4">{student.so_dien_thoai}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 font-semibold text-green-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                        Còn học
                      </span>
                    </td>
                    <td className="px-6 py-4">{student.khoa}</td>

                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 font-semibold text-blue-600">
                          {student.ten_nganh}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-4">
                        <a x-data="{ tooltip: 'Delete' }" href="#">
                          <IconTrash width={25} height={25} stroke={2} />
                        </a>
                        <a
                          x-data="{ tooltip: 'Edite' }"
                          href="#"
                          style={{ marginLeft: "20px" }}
                        >
                          <IconEdit width={25} height={25} stroke={2} />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
            : ""}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
