import { Link } from "react-router-dom"

export default function NotFound() {
    return (
        <div className="not-found-page">
            <h2>Page not found</h2>
            <p>Go to <Link to="/">Homepage</Link></p>
        </div>
    )
}