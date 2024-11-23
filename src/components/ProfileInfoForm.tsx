'use client' ;
import { saveProfile } from "@/actions/profileInfoActions";

export default function ProfileInfoForm(){
    async function handleFormAction(formData : FormData){
       const result = await saveProfile(formData);
       console.log(result)
    }
    return ( 
        <>
        <form action={handleFormAction}>
            {/* Profile Section */}
            <div className="bg-gray-200 p-4 rounded-lg">
            <div className="bg-gray-300 size-24 rounded-full p-4">avatar</div>
            <div>cover image</div>
            </div>

            {/* Username Input */}
            <div>
            <label className="block mt-4" htmlFor="usernameIn">username</label>
            <input name="username"  id="usernameIn" type="text" placeholder="username" />
            </div>

            {/* Display Name Input */}
            <div>
            <label className="block mt-4" htmlFor="displayNameIn">display name</label>
            <input name="displayName" id="displayNameIn" type="text" placeholder="display name" />
            </div>

            {/* Bio Input */}
            <div>
            <label className="block mt-4" htmlFor="bioIn">bio</label>
            <textarea id="bioIn" name="bio" placeholder="bio"></textarea>
            </div>

            {/* Save Profile Button */}
            <div>
            <button className="bg-yellow-300 px-4 py-2 rounded-lg">
            Save profile
            </button>
            </div>
        </form>
        </>
    );
}
