import "../../App.css";

const Suggestion = () => {
    return(
        <div className="py-12">
            <div className="mx-4 md:mx-24">
                <strong>Suggestion</strong>
            </div>
            <div className="md:flex md:flex-row justify-center">
                <div className="flex justify-center m-auto">
                    <img
                        src="/rtx.jpg"
                        className="img-card rounded-md w-48 h-2/6 mt-2 aspect-square object-cover"
                        alt="RTX 3080"
                    />
                </div>
                <div className="flex justify-center m-auto">
                    <img
                        src="/rtx.jpg"
                        className="img-card rounded-md w-48 h-2/6 mt-2 aspect-square object-cover"
                        alt="RTX 3080"
                    />
                </div>
                <div className="flex justify-center m-auto">
                    <img
                        src="/rtx.jpg"
                        className="img-card rounded-md w-48 h-2/6 mt-2 aspect-square object-cover"
                        alt="RTX 3080"
                    />
                </div>
                <div className="flex justify-center m-auto">
                    <img
                        src="/rtx.jpg"
                        className="img-card rounded-md w-48 h-2/6 mt-2 aspect-square object-cover"
                        alt="RTX 3080"
                    />
                </div>
            </div>
        </div>
    )
}
export default Suggestion;