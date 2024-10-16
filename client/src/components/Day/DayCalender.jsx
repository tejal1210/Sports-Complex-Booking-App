import { useState, useContext, useEffect } from "react";
import { getHourBlocks, getQuartoHourBlocks } from "../../util";
import HourDay from "./HourDay";
import GlobalContext from "../../context/GlobalContext";

const DayCalender = () => {
    const { daySelected } = useContext(GlobalContext);
    const [currentHours, setCurrentHours] = useState(getQuartoHourBlocks());
    const [currentStartDate, setCurrentStartDate] = useState(getHourBlocks());

    // Updates Hours when our Global Day State changes
    useEffect(() => {
        setCurrentHours(getQuartoHourBlocks(daySelected));
        setCurrentStartDate(getHourBlocks(daySelected));
    }, [daySelected]);

    return (
        <div className="animate__delay-2s animate__backOutLeft animate__backInRight flex flex-1 overflow-y-scroll mt-0.5">
            {/* Left: Sidebar with Hours */}
            <div className="w-24">
                <div className="flex flex-col">
                    <div className="grid grid-cols-1 grid-rows-96">
                        {/* Empty half-row to shift timings */}
                        <div className="h-9"></div> 

                        {currentHours.map((item, kee) => (
                            <div className="grid grid-cols-1 grid-rows-4 h-24" key={kee}>
                                {item.map((hrs, kd) => (
                                    <div
                                        className={`flex justify-center items-start cursor-pointer text-xs px-5 font-semibold text-black`}
                                        key={kd}
                                    >
                                        {kd === 0 ? hrs : " "}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right: 6 Columns for Courts with Headings */}
            <div className="flex-1">
                <div className="grid grid-cols-6 border-b">
                    {Array.from({ length: 6 }).map((_, courtIdx) => (
                        <div key={courtIdx} className="text-center font-bold py-2 border-r">
                            Court {courtIdx + 1}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-6">
                    {Array.from({ length: 6 }).map((_, courtIdx) => (
                        <div key={courtIdx} className="grid grid-rows-96 border-l">
                            {currentStartDate.map((week, ind) => (
                                <div key={ind} className="border-b h-24">
                                    <HourDay hour={week} court={courtIdx + 1} />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DayCalender;
