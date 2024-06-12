
import FormTextInput from "../components/FormTextInput";
import AddMinusButton from "../components/AddMinusButton";
import { capitalizeFirstLetter, splitByDash } from "../utils/TextBasedUtilityFunctions";
import RadioButton from "../components/RadioButton";

const AdoptionForm2 = () =>{
    return (
        <>
        {/* add minus button */}
        <AddMinusButton title={capitalizeFirstLetter("do you have pets right now? If yes, how many?")}/>
            <FormTextInput title={capitalizeFirstLetter("how long have you been a pet owner?")}/>
            <AddMinusButton title={capitalizeFirstLetter('how old is your oldest living pet?')}/>
            <RadioButton 
                title={"are you aware of neutering and spaying?"}
                selectionList={[
                    {id: 1, label:capitalizeFirstLetter(splitByDash("yes_for_both")), value:"yes_for_both"},
                    {id: 2, label:capitalizeFirstLetter(splitByDash("yes_for_neuter_only")), value: "yes_for_neuter_only"},
                    {id: 3, label:capitalizeFirstLetter(splitByDash("yes_for_spaying_only")), value: "yes_for_spaying_only"},
                    {id: 4, label:capitalizeFirstLetter(splitByDash("no_for_both")), value:"no_for_both"}
                ]}
            />
            <RadioButton
                title={'are you willing to neuter/spay your adopted dog/cat from us?'}
                selectionList={
                    [
                        {id:1, label: "no", value: 'no'},
                        {id:2, label: "yes", value: 'yes'},
                    ]
                }
            />
            <FormTextInput title={"regular vet clinic"}/>
        </>
    )
}

export default AdoptionForm2