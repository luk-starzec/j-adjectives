export default function CopyrightInfo() {
    const firstYear = 2023;
    const currentYear = new Date().getFullYear();
    const text = currentYear === firstYear ? `© ${currentYear}` : `© ${firstYear} - ${currentYear}`
    return text
}
