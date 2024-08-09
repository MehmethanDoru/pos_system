import { Button, Card, Form, Input, Modal, Select } from "antd";

const printBill = ({ isModalOpen, setIsModalOpen }) => {
  return (
    <Modal
      title="Print Bill"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
      width={800}
    >
      <section className="py-20 bg-black">
        <div className="max-w-5xl mx-auto bg-white px-6">
          <article className="overflow-hidden">
            <div className="logo">
              <h2 className="text-4xl font-bold py-5">LOGO</h2>
            </div>
            <div className="details grid grid-cols-4">
              <div className="text-[8px] md:text-sm">
                <p className="font-bold text-gray-600">Company Adress</p>
                <p className="text-zinc-600">Fake Street 123</p>
                <p className="text-zinc-600">San Javier</p>
                <p className="text-zinc-600">CA 1234</p>
              </div>
              <div className="text-[8px] md:text-sm">
                <p className="font-bold text-gray-600">Tax Adress</p>
                <p className="text-zinc-600">Tesla Street 007</p>
                <p className="text-zinc-600">Frisco</p>
                <p className="text-zinc-600">CA 3512</p>
              </div>
              <div>
                <div className="text-[8px] md:text-sm">
                  <p className="font-bold text-gray-600">Number of Bill</p>
                  <p className="text-zinc-600">00075</p>
                </div>
                <div className="text-[8px] md:text-sm mt-2">
                  <p className="font-bold text-gray-600">Date of Issue</p>
                  <p className="text-zinc-600">2024-08-09</p>
                </div>
              </div>
              <div>
                <div className="text-[8px] md:text-sm">
                  <p className="font-bold text-gray-600">Terms</p>
                  <p className="text-zinc-600">10 days</p>
                </div>
                <div className="text-[8px] md:text-sm mt-2">
                  <p className="font-bold text-gray-600">Due</p>
                  <p className="text-zinc-600">2024-08-19</p>
                </div>
              </div>
            </div>
            <div className="bill-table-area mt-9">
              <table className="min-w-full divide-y divide-slate-500 overflow-hidden">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th
                      scope="col"
                      className="py-3.5 pl-4 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0 sm:table-cell hidden "
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0 sm:table-cell hidden"
                    >
                      {" "}
                      Product Name
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 text-center text-sm font-normal text-slate-700 sm:pl-6 md:pl-0 sm:table-cell hidden"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 text-center text-sm font-normal text-slate-700 sm:pl-6 md:pl-0 sm:table-cell hidden"
                    >
                      Pcs
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 text-end text-sm font-normal text-slate-700 sm:pl-6 md:pl-0 sm:table-cell hidden"
                    >
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-200">
                    <td className="py-4 ">
                      <img
                        src="https://cdn.yemek.com/mnresize/1250/833/uploads/2023/04/sis-kebap-onecikan.jpg"
                        alt=""
                        className="w-12 h-12 object-cover sm:table-cell hidden"
                      />
                    </td>
                    <td className="py-4">
                      <span className="font-medium">Şiş Kebap</span>
                    </td>
                    <td className="py-4 text-center">
                      <span>25.99₺</span>
                    </td>
                    <td className="py-4 text-center">
                      <span>1</span>
                    </td>
                    <td className="py-4 text-end">
                      <span>25.99₺</span>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="py-4 ">
                      <img
                        src="https://cdn.yemek.com/mnresize/1250/833/uploads/2023/04/sis-kebap-onecikan.jpg"
                        alt=""
                        className="w-12 h-12 object-cover sm:table-cell hidden"
                      />
                    </td>
                    <td className="py-4">
                      <span className="font-medium">Şiş Kebap</span>
                    </td>
                    <td className="py-4 text-center">
                      <span>25.99₺</span>
                    </td>
                    <td className="py-4 text-center">
                      <span>1</span>
                    </td>
                    <td className="py-4 text-end">
                      <span>25.99₺</span>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th className="text-right pt-6" colSpan="4" scope="row">
                      <span className="font-normal text-slate-700">
                        Subtotal
                      </span>
                    </th>
                    <th className="text-right pt-4" scope="row">
                      <span className="font-normal text-slate-700">61₺</span>
                    </th>
                  </tr>
                  <tr>
                    <th className="text-right pt-4" colSpan="4" scope="row">
                      <span className="font-normal text-slate-700">KDV</span>
                    </th>
                    <th className="text-right pt-4" scope="row">
                      <span className="font-normal text-red-600">+4.88₺</span>
                    </th>
                  </tr>
                  <tr>
                    <th className="text-right pt-4" colSpan="4" scope="row">
                      <span className="font-bold text-slate-700">Total</span>
                    </th>
                    <th className="text-right pt-4" scope="row">
                      <span className="font-bold text-slate-700">65.88₺</span>
                    </th>
                  </tr>
                </tfoot>
              </table>
              <div className="py-9">
                <div className="border-t pt-9 border-slate-200">
                  <p className="text-sm font-light text-slate-700">
                  The payment terms are 10 days. Please note that in accordance with the Late Payment of Unpackaged Debts Act 1111, freelancers are entitled to charge a late payment fee of 25.52 if debts remain unpaid after this period, at which point a new invoice will be presented in addition to this fee. If the revised invoice is not paid within 14 days, additional interest will be applied to the overdue account plus 8% statutory rate plus 0.5% Bank of England floor totalling 8.5%. The parties cannot contract outside the provisions of the Law.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
      <div className="flex justify-end mt-4">
        <Button type="primary" size="large">Yazdır</Button>
      </div>
    </Modal>
  );
};

export default printBill;
