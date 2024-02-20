const Compatible = (props) => {
    const compatibles = props.item.compatibles;
    return (
        <>
            <div className="bg-zinc bg-gray-300 mx-3 md:mx-24 rounded justify-center mt-5 h-auto w-100">
                <div className=" md:ml-7 mr-1 w-100">
                    <div className="mt-1 h-auto p-3.5 w-100"></div>
                    <div className="p-2 w-100">
                        <table className="w-max">
                            <thead className="w-100">
                                <tr className="w-100">
                                    <th colSpan={2} className="p-2">
                                        Caractéristiques:{" "}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {compatibles.map((item) => {
                                    return (
                                        <tr className="w-12/12">
                                            <td
                                                style={{
                                                    backgroundColor: item.value,
                                                }}
                                                className={
                                                    "border border-gray-900 w-40 p-2"
                                                }
                                            ></td>
                                            <td className="border border-gray-400 w-60 p-2 ">
                                                {item.describe}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Compatible;
