import requests
from typing import Any, Dict, List
from .base import BaseScanner

class SecurityHeadersScanner(BaseScanner):
    @property
    def name(self) -> str:
        return "security_headers"

    def scan(self, domain: str) -> Dict[str, Any]:
        url = f"https://{domain}"
        try:
            response = requests.get(url, timeout=10)
            headers = response.headers
            results = {
                "HSTS": "Strict-Transport-Security" in headers,
                "CSP": "Content-Security-Policy" in headers,
                "X-Frame-Options": "X-Frame-Options" in headers,
                "X-Content-Type-Options": "X-Content-Type-Options" in headers,
                "Referrer-Policy": "Referrer-Policy" in headers,
                "raw_headers": dict(headers)
            }
            return results
        except Exception as e:
            return {"error": str(e)}

    def process_findings(self, assessment_id: int, scan_id: int, raw_results: Dict[str, Any]) -> List[Dict[str, Any]]:
        findings = []
        if "error" in raw_results:
            return findings

        mapping = {
            "HSTS": ("Missing HSTS Header", "HTTP Strict Transport Security (HSTS) header is missing.", "high"),
            "CSP": ("Missing CSP Header", "Content Security Policy (CSP) header is missing.", "medium"),
            "X-Frame-Options": ("Missing X-Frame-Options", "X-Frame-Options header is missing, allowing Clickjacking.", "medium"),
            "X-Content-Type-Options": ("Missing X-Content-Type-Options", "X-Content-Type-Options header is missing.", "low"),
        }

        for key, (title, desc, severity) in mapping.items():
            if not raw_results.get(key, False):
                findings.append({
                    "assessment_id": assessment_id,
                    "scan_id": scan_id,
                    "category": "Web Security",
                    "title": title,
                    "description": desc,
                    "severity": severity,
                    "affected_asset": key,
                    "technical_details": f"The '{key}' header was not found in the HTTP response."
                })
        
        return findings
