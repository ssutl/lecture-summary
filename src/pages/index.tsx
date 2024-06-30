import styles from "../styles/landing.module.scss";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import callMyApi from "@/helpers/callMyApi";
import { summaryArrayType } from "./api/summary";
import ContentCopy from "@mui/icons-material/ContentCopy";
import "react-notifications-component/dist/theme.css";
import { ReactNotifications } from "react-notifications-component";
import MoonLoader from "react-spinners/MoonLoader";
import notify from "@/helpers/notification";
import SummaryModal from "../Components/summaryModal";
import HistoryIcon from "@mui/icons-material/History";

export default function Landing() {
  const [inputsAmount, setInputAmount] = useState(1);
  const [type, setType] = useState<"short" | "medium" | "in-depth">("short");
  const [inputValues, setInputValues] = useState<string[]>([]);
  const [summaries, setSummaries] = useState<summaryArrayType[]>([]);
  const [displaySummaries, setDisplaySummaries] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number | undefined>(undefined);
  const [displayModal, setDisplayModal] = useState<boolean>(false);

  useEffect(() => {
    //Only display summaries when theres some available and session storage is clear
    if (summaries.length) {
      setDisplaySummaries(true);
    }
  }, [summaries]);

  //On page load checkwe want to check if summaries are already in session if so load them in
  useEffect(() => {
    const summariesString = sessionStorage.getItem("current_summaries"); // get the JSON string from session storage

    if (summariesString !== null) {
      const summaries: summaryArrayType[] = JSON.parse(summariesString); // parse the JSON string back to the original array
      setSummaries(summaries);
      setTimeout(() => {
        setDisplaySummaries(false);
      }, 50);
    }
  }, []);

  const handleNewInput = () => {
    setInputAmount(inputsAmount + 1);
  };
  const handleRemoveInput = () => {
    setInputAmount(inputsAmount - 1);
  };

  const handleType = (newType: "short" | "medium" | "in-depth") => {
    if (type !== newType) {
      setType(newType);
    }
  };

  const handleGenerateClick = async () => {
    const values = Array.from(
      document.querySelectorAll(`.${styles.inputHolder} input`)
    )
      .map((input) => (input as HTMLInputElement).value)
      .filter((value) => value !== "");

    if (values.length) {
      setLoading(true);
      const startTime = new Date().getTime(); // get the current time when the button is clicked
      const urls = values;
      const detail = type;
      try {
        //Catching any errors
        const responses: summaryArrayType[] = await callMyApi(urls, detail);
        sessionStorage.setItem("current_summaries", JSON.stringify(responses)); //Saving to session incase user refreshes

        //Creating log in session storage
        const existingArray = sessionStorage.getItem("logged_summaries");

        if (existingArray !== null) {
          const parsedArray = JSON.parse(existingArray);

          const newArray = [...parsedArray, ...responses];
          // Do something with the parsed array
          sessionStorage.setItem("logged_summaries", JSON.stringify(newArray));
        } else {
          sessionStorage.setItem("logged_summaries", JSON.stringify(responses));
        }
        //Log completed

        setSummaries(responses);
        setLoading(false);
        const endTime = new Date().getTime(); // get the current time when the response is received
        const elapsedTime = (endTime - startTime) / 1000;
        setElapsedTime(Math.floor(elapsedTime));
      } catch {
        setLoading(false);
        notify("failure");
      }
    } else {
      alert("You need to enter a value");
    }
  };

  function handleCopyClick(index: number) {
    const element = document.querySelector(
      `#${styles.content}-${index} p`
    ) as HTMLElement;
    const text = element.innerText;
    navigator.clipboard.writeText(text);
    //Adding notification for successful copy
    notify("success");
  }

  const closeModal = () => {
    setDisplayModal(false);
  };

  return (
    <>
      <div className={styles.page}>
        <ReactNotifications />
        <div className={styles.widthContainer}>
          <HistoryIcon
            id={styles.HistoryIcon}
            onClick={() => setDisplayModal(true)}
          />
          <div className={styles.section1}>
            <h1>Transform lectures into bite-sized summaries</h1>
          </div>
          {!displaySummaries ? (
            <div className={styles.section2}>
              <div className={styles.inputHalf}>
                {[...Array(inputsAmount)].map((eachInput, i) => (
                  <div className={styles.inputHolder} key={i}>
                    <input
                      autoComplete="off"
                      placeholder="Paste blackboard video address"
                    />
                    {i !== 0 && inputsAmount - 1 >= 1 ? (
                      <CloseIcon
                        className={styles.icon}
                        onClick={() => handleRemoveInput()}
                      />
                    ) : null}
                    {i === 0 && inputsAmount + 1 <= 3 ? (
                      <AddIcon
                        className={styles.icon}
                        onClick={() => handleNewInput()}
                      />
                    ) : null}
                  </div>
                ))}
                {summaries.length && !displaySummaries ? (
                  <p onClick={() => setDisplaySummaries(true)}>
                    Display Previous Summaries
                  </p>
                ) : null}
              </div>
              <div className={styles.generateHalf}>
                <div className={styles.typeButton}>
                  <div className={styles.typeDescription}>Detail</div>
                  <div className={styles.typeOptions}>
                    <p
                      className={`${styles.option} ${
                        type === "short" ? styles.active : undefined
                      }`}
                      onClick={(e) => {
                        const selectedOption = (e.target as HTMLElement)
                          .innerHTML;
                        const selectedType = selectedOption.toLocaleLowerCase();
                        if (
                          selectedType === "short" ||
                          selectedType === "medium" ||
                          selectedType === "in-depth"
                        ) {
                          handleType(selectedType);
                        }
                      }}
                    >
                      Short
                    </p>
                    <p
                      className={`${styles.option} ${
                        type === "medium" ? styles.active : undefined
                      }`}
                      onClick={(e) => {
                        const selectedOption = (e.target as HTMLElement)
                          .innerHTML;
                        const selectedType = selectedOption.toLocaleLowerCase();
                        if (
                          selectedType === "short" ||
                          selectedType === "medium" ||
                          selectedType === "in-depth"
                        ) {
                          handleType(selectedType);
                        }
                      }}
                    >
                      Medium
                    </p>
                    <p
                      className={`${styles.option} ${
                        type === "in-depth" ? styles.active : undefined
                      }`}
                      onClick={(e) => {
                        const selectedOption = (e.target as HTMLElement)
                          .innerHTML;
                        const selectedType = selectedOption.toLocaleLowerCase();
                        if (
                          selectedType === "short" ||
                          selectedType === "medium" ||
                          selectedType === "in-depth"
                        ) {
                          handleType(selectedType);
                        }
                      }}
                    >
                      In-depth
                    </p>
                  </div>
                </div>

                <p
                  className={styles.generateButton}
                  onClick={handleGenerateClick}
                >
                  {loading ? (
                    <MoonLoader size={20} color={`white`} />
                  ) : (
                    "Generate"
                  )}
                </p>
              </div>
            </div>
          ) : (
            <div className={styles.section3}>
              <p
                className={styles.backHomeButton}
                onClick={() => setDisplaySummaries(false)}
              >
                Back To Home
              </p>
              {elapsedTime ? <p>Elapsed Time: {elapsedTime} seconds</p> : null}
              {Array.isArray(summaries) &&
                summaries.map((eachVideo, index) => (
                  <div id={`${styles.content}-${index}`} key={index}>
                    <ContentCopy
                      id={styles.copyIcon}
                      onClick={() => handleCopyClick(index)}
                    />
                    <h1>{eachVideo.title}</h1>
                    <p>{eachVideo.summary}</p>
                  </div>
                ))}
              {/* {filler} */}
            </div>
          )}
        </div>
      </div>
      {displayModal ? <SummaryModal modalToggle={closeModal} /> : null}
    </>
  );
}
