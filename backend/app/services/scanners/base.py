from abc import ABC, abstractmethod
from typing import Any, Dict, List

class BaseScanner(ABC):
    @property
    @abstractmethod
    def name(self) -> str:
        """Return the name of the scanner."""
        pass

    @abstractmethod
    def scan(self, domain: str) -> Dict[str, Any]:
        """Perform the scan on the given domain and return raw results."""
        pass

    @abstractmethod
    def process_findings(self, assessment_id: int, scan_id: int, raw_results: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Process raw results and return a list of finding objects (as dicts)."""
        pass
