import FormTextInput from "../components/FormTextInput";
import { capitalizeFirstLetter, splitByDash } from "../utils/TextBasedUtilityFunctions";
import RadioButton from "../components/RadioButton";
const AdoptionForm4 = () =>{
    return (
        <>
        <FormTextInput
            title={"name five (5) basic necessities for dogs/cats?"}
                numLines={5}
            />
            <FormTextInput
                title={"name one (1) enrichment activity for dog/cat?"}
            />
            <RadioButton
                title={"how did you hear about us?"}
                selectionList={[
                    {id: 1, label: capitalizeFirstLetter(splitByDash("social_media")), value: "social_media"},
                    {id: 2, label: capitalizeFirstLetter(splitByDash("Friends/Acquaintances/Family")), value: "Friends/Acquaintances/Family"},
                    {id: 3, label: capitalizeFirstLetter(splitByDash("classmates")), value: "classmates"},
                    {id: 4, label: capitalizeFirstLetter(splitByDash("posters")), value: "posters"},
                ]}
            />
        </>
    )
}

export default AdoptionForm4