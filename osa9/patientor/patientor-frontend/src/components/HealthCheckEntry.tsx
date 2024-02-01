import { HealthCheckEntry as HealthCheckEntryType } from "../types";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { HealthCheckRating } from "../types";
import FavoriteIcon from "@mui/icons-material/Favorite";

const HealthCheckEntry: React.FC<{ entry: HealthCheckEntryType }> = ({
  entry,
}) => {
  const renderHeartIcon = (rating: HealthCheckRating) => {
    let color = "";
    switch (rating) {
      case HealthCheckRating.Healthy:
        color = "green";
        break;
      case HealthCheckRating.LowRisk:
        color = "yellow";
        break;
      case HealthCheckRating.HighRisk:
        color = "red";
        break;
      case HealthCheckRating.CriticalRisk:
        color = "black";
        break;
      default:
        color = "grey";
    }
    return <FavoriteIcon style={{ color }} />;
  };
  return (
    <div>
      <div>
        {entry.date} {<MedicalServicesIcon />}
      </div>
      <div style={{ fontStyle: "italic" }}>{entry.description}</div>
      <div>{renderHeartIcon(entry.healthCheckRating)}</div>
      <div>Diagnose by {entry.specialist}</div>
    </div>
  );
};

export default HealthCheckEntry;
