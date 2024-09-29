import { BaseForm } from "components/ResumeForm/Form";
import {
  Input,
  InputGroupWrapper,
  Textarea,
} from "components/ResumeForm/Form/InputGroup";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { changeProfile, selectProfile } from "lib/redux/resumeSlice";
import { ResumeProfile } from "lib/redux/types";
import { ChangeEvent } from "react";
import Image from "next/image";
import { DeleteIconButton } from "./Form/IconButton";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";

export const ProfileForm = () => {
  const profile = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();
  const {
    name,
    email,
    phone,
    url,
    summary,
    homeAddress,
    picture,
    dateOfBirth,
    gender,
    nationality,
  } = profile;

  const handleProfileChange = (field: keyof ResumeProfile, value: string) => {
    dispatch(changeProfile({ field, value }));
  };
  const handleProfilePictureChange = (event: ChangeEvent<HTMLInputElement>) => {
    const type = "picture";
    const file = event.target.files?.[0];
    const reader = new FileReader();
    const field = "picture" as keyof ResumeProfile;

    reader.onload = () => {
      const value = reader.result as string;

      dispatch(changeProfile({ field, value, type }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const removeProfilePicture = () => {
    const type = "removepicture";
    const field = "picture" as keyof ResumeProfile;
    const value = "";
    dispatch(changeProfile({ field, value, type }));
  };

  return (
    <BaseForm>
      <div className="grid grid-cols-6 gap-3">
        <Input
          label="Name"
          labelClassName="col-span-full"
          name="name"
          placeholder="Ram Nepal"
          value={name}
          onChange={handleProfileChange}
        />
        <Textarea
          label="Summary"
          labelClassName="col-span-full"
          name="summary"
          placeholder="A Right Recruiter can hire a right talent"
          value={summary}
          maxLength={4000}
          onChange={handleProfileChange}
        />
        <Input
          label="Home Address"
          labelClassName="col-span-4"
          name="homeAddress"
          placeholder="Kathmandu, Nepal"
          value={homeAddress}
          onChange={handleProfileChange}
        />

        <Input
          label="Date of Birth"
          labelClassName="col-span-4"
          name="dateOfBirth"
          type="date"
          placeholder="YYYY-MM-DD"
          value={dateOfBirth}
          onChange={handleProfileChange}
        />

        <Input
          label="Nationality"
          labelClassName="col-span-2"
          name="nationality"
          placeholder="Nepali"
          value={nationality}
          onChange={handleProfileChange}
        />

        <Input
          label="Email Address"
          labelClassName="col-span-4"
          name="email"
          placeholder="speedwings@gmail.com"
          value={email}
          onChange={handleProfileChange}
        />
        <Input
          label="Gender"
          labelClassName="col-span-2"
          name="gender"
          placeholder="Male"
          value={gender}
          onChange={handleProfileChange}
        />

        <Input
          label="Social Media Link"
          labelClassName="col-span-4"
          name="url"
          placeholder="linkedin.com/speed-wings-human-resource"
          value={url}
          onChange={handleProfileChange}
        />
        <Input
          label="Phone Number"
          labelClassName="col-span-2"
          name="phone"
          placeholder="(977) 9851345343"
          value={phone}
          onChange={handleProfileChange}
        />

        <div className="flex w-[100%] items-end gap-1 lg:w-[46%]">
          <InputGroupWrapper label={"Profile Picture"} className={"col-span-2"}>
            <div className="flex h-[100px] w-[200px] items-center justify-center border">
              <label
                className="flex cursor-pointer flex-col items-center gap-[5px]"
                htmlFor="file-upload"
              >
                <ArrowUpOnSquareIcon
                  className="text-black-700 h-5 w-5"
                  aria-hidden="true"
                />
                <span className="text-[12px]">Add Picture</span>
              </label>
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                name="profile"
                className="hidden"
                onChange={(event) => handleProfilePictureChange(event)}
              />
            </div>
          </InputGroupWrapper>
          {picture !== "" ? (
            <div className={"col-span-2 flex items-center"}>
              <div className="flex h-[100px] w-[200px] items-center justify-end">
                <img
                  src={`${picture}`}
                  alt="Preview"
                  className="rounded-xl"
                  style={{ width: "130px", height: "120px" }}
                />
              </div>
              <DeleteIconButton
                onClick={removeProfilePicture}
                tooltipText="Remove Picture"
              />
            </div>
          ) : null}
        </div>
      </div>
    </BaseForm>
  );
};
