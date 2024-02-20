export const Caracteristique = (props) => {
    const caracteristiques = props.item;
    const compatibles = props.item.compatibles;
    return (
        <div className="bg-zinc bg-gray-300 mx-3 md:mx-24 rounded justify-center mt-5 h-auto w-100">
            <div className=" md:ml-7 mr-1 w-100">
                <div className="flex justify-evenly m-auto flex-wrap">
                    <div className="mt-1 h-auto p-3.5 w-100">
                        {caracteristiques ? (
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
                                        {caracteristiques.caracteristiques.map(
                                            (item) => {
                                                return (
                                                    <tr className="w-12/12">
                                                        <td className="border border-gray-900 w-40 p-2 ">
                                                            {item.name}
                                                        </td>
                                                        <td className="border border-gray-400 w-60 p-2 ">
                                                            {item.value}
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                    <div className="p-2 w-100">
                        <table className="w-max">
                            <thead className="w-100">
                                <tr className="w-100">
                                    <th colSpan={2} className="p-2">
                                        Compatibilités:{" "}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {compatibles.map((item) => {
                                    return (
                                        <>
                                            <tr className="w-12/12 flex mx-4 min-h-48">
                                                <td
                                                    style={{
                                                        backgroundColor: item.value,
                                                    }}
                                                    className={
                                                        "w-1/12 rounded-full p-5"
                                                    }
                                                ></td>
                                                <span className="p-2"></span>
                                                <td className="border border-gray-400 w-60 p-2 ">
                                                    {item.describe}
                                                </td>
                                            </tr>
                                            <tr className="w-12/12 min-h-48">
                                                <td className="p-1"></td>
                                            </tr>
                                        </>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
