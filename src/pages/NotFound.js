import { Link } from "react-router-dom"

export default function NotFound() {
    return (
        <div className="notfound-page">
            <h2>Page not found</h2>
            <p>Go to <Link>Homepage</Link></p>
        </div>
    )
}