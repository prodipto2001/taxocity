import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="font-sans">
      <div className="max-w-[1256px] mx-auto px-5 md:px-16 py-20">
        <div className="grid grid-cols-2 gap-8 md:flex md:items-stretch md:justify-between">
          {/* Brand Section */}
          <div className="col-span-2 flex flex-col items-start justify-between md:col-span-1">
            <Link href="/" className="text-2xl font-bold text-primary">
              <Image
                src="/logos/taxocity.png"
                alt="taxocity logo"
                width={100}
                height={45}
                className="shrink-0"
              />
            </Link>
            <div className="space-y-6 text-sm text-black">
              <p className="font-semibold">
                Taxocity Enterprise Private Limited
              </p>
              <p>CIN: U70200DL2025PTC453592</p>
            </div>
          </div>

          {/* Company Incorporation */}
          <div>
            <h3 className="font-semibold text-black mb-4">
              Company Incorporation
            </h3>
            <ul className="space-y-2 text-sm text-black">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Privated Company Limited
                </Link>
              </li>
              <li>
                <Link
                  href="https://taxocity.com/product/sole-prop-reg"
                  className="hover:text-primary transition-colors"
                >
                  Sole Proprietorship
                </Link>
              </li>
              <li>
                <Link
                  href="https://taxocity.com/product/partnership-reg"
                  className="hover:text-primary transition-colors"
                >
                  Partnership Firm
                </Link>
              </li>
              <li>
                <Link
                  href="https://taxocity.com/product/opc-reg"
                  className="hover:text-primary transition-colors"
                >
                  One Person Company
                </Link>
              </li>
              <li>
                <Link
                  href="https://taxocity.com/product/llp-reg"
                  className="hover:text-primary transition-colors"
                >
                  Limited Liability Partnership
                </Link>
              </li>
            </ul>
          </div>

          {/* GST */}
          <div>
            <h3 className="font-semibold text-black mb-4">GST</h3>
            <ul className="space-y-2 text-sm text-black">
              <li>
                <Link
                  href="https://taxocity.com/product/gst-reg"
                  className="hover:text-primary transition-colors"
                >
                  GST Registration
                </Link>
              </li>
              <li>
                <Link
                  href="https://taxocity.com/product/gst-return-filing"
                  className="hover:text-primary transition-colors"
                >
                  GST Return Filing
                </Link>
              </li>
              <li>
                <Link
                  href="https://taxocity.com/product/gst-revoke"
                  className="hover:text-primary transition-colors"
                >
                  GST Revocation/Recovery
                </Link>
              </li>
              <li>
                <Link
                  href="http://taxocity.com/product/gst-cancel"
                  className="hover:text-primary transition-colors"
                >
                  GST Cancellation
                </Link>
              </li>
            </ul>
          </div>

          {/* MCA Compliance */}
          <div>
            <h3 className="font-semibold text-black mb-4">MCA Compliance</h3>
            <ul className="space-y-2 text-sm text-black">
              <li>
                <Link
                  href="https://taxocity.com/product/appoint-director"
                  className="hover:text-primary transition-colors"
                >
                  Appoitment of Director
                </Link>
              </li>
              <li>
                <Link
                  href="https://taxocity.com/product/change-add"
                  className="hover:text-primary transition-colors"
                >
                  Change Address
                </Link>
              </li>
              <li>
                <Link
                  href="https://taxocity.com/product/change-obj"
                  className="hover:text-primary transition-colors"
                >
                  Change Objective/Activity
                </Link>
              </li>
              <li>
                <Link
                  href="https://taxocity.com/product/close-pvt-ltd"
                  className="hover:text-primary transition-colors"
                >
                  Close the Pvt. Ltd. Company
                </Link>
              </li>
              <li>
                <Link
                  href="https://taxocity.com/product/director-removal"
                  className="hover:text-primary transition-colors"
                >
                  Removal of Director
                </Link>
              </li>
              <li>
                <Link
                  href="https://taxocity.com/product/increase-auth-cap"
                  className="hover:text-primary transition-colors"
                >
                  Increased Authorized Share Capital
                </Link>
              </li>
            </ul>
          </div>

          {/* ITR */}
          <div>
            <h3 className="font-semibold text-black mb-4">ITR</h3>
            <ul className="space-y-2 text-sm text-black">
              <li>
                <Link
                  href="https://taxocity.com/product/business-itr"
                  className="hover:text-primary transition-colors"
                >
                  Business ITR
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-16">
          <p className="text-sm text-black font-semibold mb-6">
            By continuing past this page, you agree to our{" "}
            <Link
              href="https://taxocity.com/terms-conditions"
              target="_blank"
              className="text-primary hover:underline"
            >
              Terms of Service
            </Link>
            ,{" "}
            <Link
              href="https://taxocity.com/privacy-policy"
              target="_blank"
              className="text-primary hover:underline"
            >
              Cookie Policy
            </Link>
            ,{" "}
            <Link
              href="https://taxocity.com/privacy-policy/"
              target="_blank"
              className="text-primary hover:underline"
            >
              Privacy Policy
            </Link>
            , and{" "}
            <Link
              href="https://taxocity.com/refund-and-return-policy"
              target="_blank"
              className="text-primary hover:underline"
            >
              Refund Policy
            </Link>
            .
          </p>
          <p className="font-semibold text-sm text-black mb-16">
            <Link
              href="https://taxocity.com"
              target="_blank"
              className="hover:underline"
            >
              Taxocity Enterprise Private Limited.
            </Link>{" "}
            All rights reserved.
          </p>
          <div className="mb-16">
            <h4 className="text-sm font-semibold text-black mb-2">
              Website Disclaimer:
            </h4>
            <p className="text-sm text-black leading-tight font-medium">
              This website is privately operated and not affiliated with any
              government entity. We do not represent or are affiliated with,
              endorsed by, or in any way connected to any government body or
              department. The form provided is not for official registration
              purposes; rather, it's designed to gather information from our
              clients to help us better understand their business or compliance
              needs. By continuing to use this website, you acknowledge that we
              are a private company. We offer assistance based on customer
              requests, and the fees collected on this website are charged as a
              platform fee.
            </p>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-black">
            <div className="flex items-center gap-6">
              <p className="text-sm text-black mb-4 md:mb-0">
                © 2025 Taxocity. All rights reserved.
              </p>
              <Link
                href="https://taxocity.com/privacy-policy"
                className="text-sm text-black hover:text-primary transition-colors hover:underline underline-offset-2"
              >
                Privacy Policy
              </Link>
              <Link
                href="https://taxocity.com/terms-condition"
                className="text-sm text-black hover:text-primary transition-colors hover:underline underline-offset-2"
              >
                Terms of Service
              </Link>
              <Link
                href="https://taxocity.com/privacy-policy"
                className="text-sm text-black hover:text-primary transition-colors hover:underline underline-offset-2"
              >
                Cookies Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
