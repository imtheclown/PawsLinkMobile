import FormTextInput from "../components/FormTextInput";
import { capitalizeFirstLetter, splitByDash } from "../utils/TextBasedUtilityFunctions";
import RadioButton from "../components/RadioButton";
const AdoptionForm3 = () => {
    return (
        <>
            <FormTextInput
            title={"where do you plan to keep the adopted dog/cat?"}
            />
            <RadioButton
            title={"are you planning to keep them indoors only? Indoors with occasional outdoor time? or Strictly outdoor?"}
            selectionList={[
                {id: 1, label:capitalizeFirstLetter(splitByDash("indoors_only")), value:"indoors_only"},
                {id: 2, label:capitalizeFirstLetter(splitByDash("indoors_with occasional_outdoor_time")), value:"indoors_with occasional_outdoor_time"},
                {id: 3, label:capitalizeFirstLetter(splitByDash("strictly_outdoors")), value:"strictly_outdoors"}
            ]}
            />
            <RadioButton
            title={"will you keep them leashed or caged? or just when needed?"}
            selectionList={[
                {id: 1, label:capitalizeFirstLetter(splitByDash("leashed")), value:"leashed"},
                {id: 2, label:capitalizeFirstLetter(splitByDash("caged")), value:"caged"},
                {id: 3, label:capitalizeFirstLetter(splitByDash("leashed_and_caged")), value:"leashed_and_caged"},
                {id: 4, label:capitalizeFirstLetter(splitByDash("only_when_needed")), value:"only_when_needed"}
            ]}
        />
        </>
    )
}
export default AdoptionForm3