import React from "react";
import { useState, useEffect } from "react";
import supabase from "../contexts/supabaseClient";
import NoProfile from "../dashboard/profile/NoProfile";
import OrgBasicData from "./OrgData/OrgBasicData";
import OrgOppAndId from "./OrgData/OrgOppAndId";
import OrgContactData from "./OrgData/OrgContactData";
import OrgAddressData from "./OrgData/OrgAddressData";
import OrgLinks from "./OrgData/OrgLinks";
import OrgPetType from "./OrgData/OrgPetType";
import OrgshortDesc from "./OrgData/OrgShortDesc";
import OrgDesc from "./OrgData/OrgDesc";

export default function ViewOrganisationProfile({ id }) {
  const [userData, setUserData] = useState(null);
  const [src, setSrc] = useState(null);

  useEffect(() => {
    const viewOrganisation = async () => {
      const { data, error } = await supabase
        .from("organisation")
        .select("*")
        .eq("uuid", id)
        .single();

      if (error) {
        console.log(error);
      }
      if (data) {
        setUserData(data);
      }
    };
    viewOrganisation();

    const urls = async () => {
      const { data, error } = await supabase.storage
        .from("avatars")
        .createSignedUrls([`organisationpf/${id}`], 60);

      if (error) {
        console.log(error);
      }
      if (data) {
        setSrc(data[0].signedUrl);
      }
    };
    urls();
  }, []);

  return (
    <div className="org">
      <div className="view-profile-card">
        {userData && (
          <div className="profile-data-container">
            <div className="view-profile-basic-data-and-photo">
              <img src={src && src} className="view-usercard-photo" />

              <div className="view-profile-basic-data">
                <OrgBasicData
                  name={userData.name}
                  type={userData.type}
                  id={id}
                />
                <OrgOppAndId
                  identification={userData.identification}
                  opp={userData.opp}
                  id={id}
                />
              </div>
            </div>
            <div className="view-profile-decor"></div>
            <div
              style={{
                display: "flex",
                gap: "7%",
                justifyContent: "space-evenly",
              }}
            >
              <OrgContactData
                phone={userData.phone}
                email={userData.email}
                id={id}
              />
              <OrgAddressData
                address={userData.address}
                city={userData.city}
                zipCode={userData.zipCode}
                voivodeship={userData.voivodeship}
                id={id}
              />
              <OrgLinks
                facebook={userData.facebook}
                instagram={userData.instagram}
                www={userData.www}
                id={id}
              />
            </div>
            <div className="view-profile-decor"></div>
            <OrgPetType
              cats={userData.cats}
              dogs={userData.dogs}
              birds={userData.birds}
              rodents={userData.rodents}
              all={userData.all}
              type={userData.type}
              id={id}
            />
            <OrgshortDesc shortDesc={userData.shortDesc} id={id} />
            <OrgDesc desc={userData.desc} id={id} />
          </div>
        )}
        {!userData ? <NoProfile /> : null}
      </div>
    </div>
  );
}
