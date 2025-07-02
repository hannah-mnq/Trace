from pydantic import BaseModel
from typing import List,Dict

class SystemInput(BaseModel):
    components: List[str]
    dependencies: Dict[str, List[str]]
    failures: List[str]
    