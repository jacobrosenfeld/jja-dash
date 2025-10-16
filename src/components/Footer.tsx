export default function Footer() {
  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME || 'Intranet Dashboard';
  const companyShortCode = process.env.NEXT_PUBLIC_COMPANY_SHORT_CODE || 'Company';
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'admin@example.com';
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <p className="text-gray-600">
            Made with ❤️ in Teaneck, NJ
          </p>
          <p className="text-gray-500 text-sm">
            © {currentYear} {companyShortCode}. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            <a
              href={`mailto:${supportEmail}`}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}