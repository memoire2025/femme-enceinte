
export default function NotFound () {
    return (
        <>
            <div className="d-flex flex-column justify-content-center" 
                 style={{alignItems : "center", height : "100vh"}}>
                <h1 className="text-secondary fw-bold text-danger"
                    style={{fontSize : "6em"}}
                >404</h1>
                <p className="text-secondary" style={{fontSize : "3em"}}>Page not found</p>
            </div>
        </>
    )
}