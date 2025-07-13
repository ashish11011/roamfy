"use client";
import Input from "@/conponents/input";
import Textarea from "@/conponents/textArea";
import { useEffect, useState } from "react";
import { InputArray } from "./inputArray";
import { CustomSwitch } from "./customSwitch";
import { UploadImage } from "./bannerImage";
import { Images } from "./imagesInput";
import { Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { cn } from "@/lib/utils";
// import { editTrip } from "../../lib/tripHelper";
import { useRouter } from "next/navigation";
import RichTextEditor from "@/conponents/RichTextEditor";
import { editTrip, insertTrip } from "lib";

export const TripForm = ({ tripData }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [cTripDetails, setCTripDetails] = useState({
    isNew: tripData?.id ? false : true,
    id: tripData?.id || uuidv4(),
    slug: tripData?.slug || "",
    title: tripData?.title || "",
    description: tripData?.description || "",
    tripInformation: tripData?.tripInformation || "",
    images: tripData?.images || [],
    bannerImage: tripData?.bannerImage || "",

    itinary: tripData?.itinary || [],

    isVisible: tripData?.isVisible || true,
    isDomestic: tripData?.isDomestic == false ? false : true,

    //hotel details
    hotels: tripData?.hotels || [
      {
        hotelName: "",
        hotelImage: "",
        hotelRating: "",
        hotelLocation: "",
      },
    ],
  });

  useEffect(() => {
    console.log(cTripDetails);
  }, [cTripDetails]);

  async function handleSubmit() {
    setIsLoading(true);
    if (cTripDetails.isNew) {
      await insertTrip(cTripDetails);
    } else {
      await editTrip(cTripDetails);
    }
    setIsLoading(false);
    router.push("/admin");
  }

  return (
    <div className=" w-full  flex flex-col gap-6">
      <SubmitButton onClickHandler={handleSubmit} isLoading={isLoading} />
      <Input
        title="Title"
        placeholder="Enter trip title"
        value={cTripDetails.title}
        onChange={(e) =>
          setCTripDetails({ ...cTripDetails, title: e.target.value })
        }
      />
      <Textarea
        title="Description"
        placeholder="Enter trip description"
        value={cTripDetails.description}
        onChange={(e) =>
          setCTripDetails({ ...cTripDetails, description: e.target.value })
        }
      />

      <RichTextEditor
        data={cTripDetails.tripInformation}
        setData={(newInformationData) => {
          setCTripDetails((prev) => {
            return { ...prev, tripInformation: newInformationData };
          });
        }}
      />

      <InputArray
        title="Itinary"
        placeholder="Enter trip itinary"
        value={cTripDetails.itinary}
        onChangehandler={(value) => {
          setCTripDetails({ ...cTripDetails, itinary: value });
        }}
      />

      <div className=" flex gap-4 ">
        <CustomSwitch
          title={"Is Visible"}
          value={cTripDetails.isVisible}
          onChange={() =>
            setCTripDetails((prev) => ({
              ...prev,
              isVisible: !prev.isVisible,
            }))
          }
        />
        <CustomSwitch
          title={"Is Domestic"}
          value={cTripDetails.isDomestic}
          onChange={() =>
            setCTripDetails((prev) => ({
              ...prev,
              isDomestic: !prev.isDomestic,
            }))
          }
        />
      </div>

      {/* #################################################################### */}
      {/* #################################################################### */}
      <UploadImage
        image={cTripDetails.bannerImage}
        setImage={(value) =>
          setCTripDetails({ ...cTripDetails, bannerImage: value })
        }
      />
      <Images
        id={cTripDetails.id}
        images={cTripDetails.images}
        setImages={(value) =>
          setCTripDetails({ ...cTripDetails, images: value })
        }
      />
      {/* #################################################################### */}
      {/* #################################################################### */}

      {/* Hotel selectin is remaining */}

      {cTripDetails?.hotels?.map((hotel, idx) => {
        function removeCurrentHotel() {
          setCTripDetails((prev) => ({
            ...prev,
            hotels: prev.hotels.filter((item, index) => index !== idx),
          }));
        }
        return (
          <div key={idx}>
            <div className=" border-t-2 flex justify-between items-center gap-6 py-3 w-full">
              <p>Hotel {idx + 1}</p>
              <Trash2 onClick={removeCurrentHotel} size={20} color="red" />
            </div>
            <UploadImage
              image={hotel.hotelImage}
              setImage={(value) => {
                setCTripDetails((prev) => {
                  const updatedHotels = prev.hotels.map((item, index) =>
                    index === idx ? { ...item, hotelImage: value } : item
                  );
                  return {
                    ...prev,
                    hotels: updatedHotels,
                  };
                });
              }}
            />

            <div className=" flex gap-6 w-full">
              <Input
                title={`Hotel Name`}
                placeholder={`Enter hotel Name`}
                value={hotel.hotelName}
                onChange={(e) =>
                  setCTripDetails((prev) => ({
                    ...prev,
                    hotels: prev.hotels.map((item, index) => {
                      if (index === idx) {
                        return {
                          ...item,
                          hotelName: e.target.value,
                        };
                      }
                      return item;
                    }),
                  }))
                }
              />
              <Input
                title={`Hotel location`}
                placeholder={`Enter hotel Location`}
                value={hotel.hotelLocation}
                onChange={(e) =>
                  setCTripDetails((prev) => ({
                    ...prev,
                    hotels: prev.hotels.map((item, index) => {
                      if (index === idx) {
                        return {
                          ...item,
                          hotelLocation: e.target.value,
                        };
                      }
                      return item;
                    }),
                  }))
                }
              />
            </div>

            <Input
              type="number"
              title={`Hotel Rating`}
              placeholder={`Enter hotel rating`}
              value={hotel.hotelRating}
              onChange={(e) =>
                setCTripDetails((prev) => ({
                  ...prev,
                  hotels: prev.hotels.map((item, index) => {
                    if (index === idx) {
                      return {
                        ...item,
                        hotelRating: e.target.value,
                      };
                    }
                    return item;
                  }),
                }))
              }
            />
          </div>
        );
      })}

      <button
        onClick={() =>
          setCTripDetails((prev) => ({
            ...prev,
            hotels: [
              ...prev.hotels,
              {
                hotelName: "",
                hotelLocation: "",
                hotelDescription: "",
                hotelRating: "",
              },
            ],
          }))
        }
        className=" text-center w-fit cursor-pointer py-2 px-4 bg-green-400 rounded"
      >
        Add new hotel
      </button>
      <SubmitButton onClickHandler={handleSubmit} isLoading={isLoading} />
    </div>
  );
};

function SubmitButton({ isLoading, onClickHandler }) {
  return (
    <button
      // disabled={isLoading}
      onClick={onClickHandler}
      className={cn(
        " rounded cursor-pointer py-2 px-4 bg-primary text-white"
        // isLoading && " opacity-50 cursor-not-allowed"
      )}
    >
      Save
    </button>
  );
}
