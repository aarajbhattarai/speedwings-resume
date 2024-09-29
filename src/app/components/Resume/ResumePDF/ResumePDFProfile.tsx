import { View, Image, Line } from "@react-pdf/renderer";
import {
  ResumePDFIcon,
  type IconType,
} from "components/Resume/ResumePDF/common/ResumePDFIcon";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import {
  ResumePDFLink,
  ResumePDFSection,
  ResumePDFText,
} from "components/Resume/ResumePDF/common";
import type { ResumeProfile } from "lib/redux/types";
import { DEFAULT_BLACK } from "lib/redux/settingsSlice";

export const ResumePDFProfile = ({
  profile,
  themeColor,
  isPDF,
}: {
  profile: ResumeProfile;
  themeColor: string;
  isPDF: boolean;
}) => {
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
  const iconProps = { email, phone, homeAddress, url };
  console.log(name, dateOfBirth, gender, nationality);

  return (
    <ResumePDFSection style={{ marginTop: spacing["4"] }}>
      <View
        style={{
          ...styles.flexRowBetween,
          flexWrap: "wrap",
          marginTop: spacing["0.5"],
        }}
      >
        <View
          style={{
            ...styles.flexCol,
            flexWrap: "wrap",
            marginTop: spacing["0.5"],
            maxWidth: picture ? "80%" : "100%",
          }}
        >
          <ResumePDFText
            bold={true}
            themeColor={themeColor}
            style={{ fontSize: "20pt" }}
          >
            {name}
          </ResumePDFText>
          <View style={{ height: 3,margin: spacing["1"], backgroundColor: themeColor, marginVertical: spacing["0.5"] }} />
          <View
            style={{
              ...styles.flexRowBetween,
              flexWrap: "wrap",
              marginTop: spacing["0.5"],
              justifyContent: "space-between",
              maxWidth: picture ? "80%" : "100%",
            }}
          >
            {dateOfBirth && (
              <ResumePDFText
                bold={true}
                style={{ fontSize: "10pt" }}
                themeColor={DEFAULT_BLACK}
              >
                DOB: {dateOfBirth}
              </ResumePDFText>
            )}
            {nationality && (
              <ResumePDFText
                bold={true}
                style={{ fontSize: "10pt" }}
                themeColor={DEFAULT_BLACK}
              >
                Nationality: {nationality}
              </ResumePDFText>
            )}
            {gender && (
              <ResumePDFText
                bold={true}
                themeColor={DEFAULT_BLACK}
                style={{ fontSize: "10pt" }}
              >
                Gender: {gender}
              </ResumePDFText>
            )}
          </View>
          {summary && (
            <View
              style={{
                display: "flex",
                //   flexWrap: "wrap",
                //   maxWidth: "100%",
                marginTop: spacing["1"],
                overflow: "hidden",
              }}
            >
              <ResumePDFText
                style={{
                  textAlign: "justify",
                }}
              >
                {summary}
              </ResumePDFText>
            </View>
          )}
        </View>

        {picture !== "" ? (
          <View style={{ alignContent: "flex-start" }}>
            <Image
              src={picture}
              style={{
                width: 100,
                height: 100,
                borderRadius: 40,
                marginLeft: spacing["1"],
              }}
            />
            <img
              src={picture}
              style={{
                width: 100,
                height: 100,
                borderRadius: 40,
                marginLeft: spacing["1"],
              }}
            />
          </View>
        ) : null}
      </View>

      <View
        style={{
          ...styles.flexRowBetween,
          flexWrap: "wrap",
          marginTop: spacing["0.5"],
        }}
      >
        {Object.entries(iconProps).map(([key, value]) => {
          if (!value) return null;

          let iconType = key as IconType;
          if (key === "url") {
            if (value.includes("linkedin")) {
              iconType = "url_linkedin";
            }
          }

          const shouldUseLinkWrapper = ["email", "url", "phone"].includes(key);
          const Wrapper = ({ children }: { children: React.ReactNode }) => {
            if (!shouldUseLinkWrapper) return <>{children}</>;

            let src = "";
            switch (key) {
              case "email": {
                src = `mailto:${value}`;
                break;
              }
              case "phone": {
                src = `tel:${value.replace(/[^\d+]/g, "")}`; // Keep only + and digits
                break;
              }
              default: {
                src = value.startsWith("http") ? value : `https://${value}`;
              }
            }

            return (
              <ResumePDFLink src={src} isPDF={isPDF}>
                {children}
              </ResumePDFLink>
            );
          };

          return (
            <View
              key={key}
              style={{
                ...styles.flexRow,
                alignItems: "center",
                gap: spacing["1"],
              }}
            >
              <ResumePDFIcon type={iconType} isPDF={isPDF} />
              <Wrapper>
                <ResumePDFText>{value}</ResumePDFText>
              </Wrapper>
            </View>
          );
        })}
      </View>
    </ResumePDFSection>
  );
};
