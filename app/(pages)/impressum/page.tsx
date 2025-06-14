// app/privacy-policy/page.tsx
import React from "react";
import PrivacyPolicyContent from "./PrivacyPolicyContent";

export default function PrivacyPolicyPage() {
  return (
    <section id="Privacy_Policy">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <PrivacyPolicyContent />
          </div>
        </div>
      </div>
    </section>
  );
}
