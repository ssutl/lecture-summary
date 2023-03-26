import styles from "../styles/landing.module.scss";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import callMyApi from "@/helpers/callMyApi";
import { summaryArrayType } from "./api/summary";
import ContentCopy from "@mui/icons-material/ContentCopy";
import "react-notifications-component/dist/theme.css";
import { ReactNotifications } from "react-notifications-component";
import { Store } from "react-notifications-component";
import MoonLoader from "react-spinners/MoonLoader";

export default function landing() {
  const [inputsAmount, setInputAmount] = useState(1);
  const [type, setType] = useState<"short" | "medium" | "in-depth">("short");
  const [inputValues, setInputValues] = useState<string[]>([]);
  const [summaries, setSummaries] = useState<summaryArrayType[]>([]);
  const [displaySummaries, setDisplaySummaries] = useState<boolean>(false);

  useEffect(() => {
    //Whenever summaries updates we want to display it
    if (summaries.length) {
      setDisplaySummaries(true);
    }
  }, [summaries]);

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
      const urls = values;
      const detail = type;
      console.log("detail", detail);
      const responses: summaryArrayType[] = await callMyApi(urls, detail);
      setSummaries(responses);
    }
  };

  function handleCopyClick(index: number) {
    const element = document.querySelector(
      `#${styles.content}-${index} p`
    ) as HTMLElement;
    const text = element.innerText;
    navigator.clipboard.writeText(text);

    //Adding notification for successful copy

    Store.addNotification({
      title: "Copied!",
      message: "Summary has been copied to your clipboard!! 📜",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5500,
        onScreen: true,
      },
    });
  }

  return (
    <div className={styles.page}>
      <ReactNotifications />
      <div className={styles.widthContainer}>
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
            </div>
            <div className={styles.generateHalf}>
              {summaries.length && !displaySummaries ? (
                <p onClick={() => setDisplaySummaries(true)}>
                  Display Previous Summaries
                </p>
              ) : null}
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
                      console.log("selectedType", selectedType);
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
                Generate
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
            {summaries.map((eachVideo, index) => (
              <div id={`${styles.content}-${index}`}>
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
  );
}

const filler = (
  <>
    <div>
      <h1>0</h1>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat earum
        unde nesciunt enim quo vel, molestias nam perspiciatis, itaque tempora
        sequi odio cum officiis, qui at minus sed nisi iure! Lorem, ipsum dolor
        sit amet consectetur adipisicing elit. Repellat earum unde nesciunt enim
        quo vel, molestias nam perspiciatis, itaque tempora sequi odio cum
        officiis, qui at minus sed nisi iure! Lorem, ipsum dolor sit amet
        consectetur adipisicing elit. Repellat earum unde nesciunt enim quo vel,
        molestias nam perspiciatis, itaque tempora sequi odio cum officiis, qui
        at minus sed nisi iure! Lorem, ipsum dolor sit amet consectetur
        adipisicing elit. Repellat earum unde nesciunt enim quo vel, molestias
        nam perspiciatis, itaque tempora sequi odio cum officiis, qui at minus
        sed nisi iure! Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Repellat earum unde nesciunt enim quo vel, molestias nam perspiciatis,
        itaque tempora sequi odio cum officiis, qui at minus sed nisi iure!
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat earum
        unde nesciunt enim quo vel, molestias nam perspiciatis, itaque tempora
        sequi odio cum officiis, qui at minus sed nisi iure! Lorem, ipsum dolor
        sit amet consectetur adipisicing elit. Repellat earum unde nesciunt enim
        quo vel, molestias nam perspiciatis, itaque tempora sequi odio cum
        officiis, qui at minus sed nisi iure! Lorem, ipsum dolor sit amet
        consectetur adipisicing elit. Repellat earum unde nesciunt enim quo vel,
        molestias nam perspiciatis, itaque tempora sequi odio cum officiis, qui
        at minus sed nisi iure! Lorem, ipsum dolor sit amet consectetur
        adipisicing elit. Repellat earum unde nesciunt enim quo vel, molestias
        nam perspiciatis, itaque tempora sequi odio cum officiis, qui at minus
        sed nisi iure! Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Repellat earum unde nesciunt enim quo vel, molestias nam perspiciatis,
        itaque tempora sequi odio cum officiis, qui at minus sed nisi iure!
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat earum
        unde nesciunt enim quo vel, molestias nam perspiciatis, itaque tempora
        sequi odio cum officiis, qui at minus sed nisi iure! Lorem, ipsum dolor
        sit amet consectetur adipisicing elit. Repellat earum unde nesciunt enim
        quo vel, molestias nam perspiciatis, itaque tempora sequi odio cum
        officiis, qui at minus sed nisi iure!
      </p>
    </div>
    <div>
      <h1>1</h1>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat earum
        unde nesciunt enim quo vel, molestias nam perspiciatis, itaque tempora
        sequi odio cum officiis, qui at minus sed nisi iure! Lorem, ipsum dolor
        sit amet consectetur adipisicing elit. Repellat earum unde nesciunt enim
        quo vel, molestias nam perspiciatis, itaque tempora sequi odio cum
        officiis, qui at minus sed nisi iure! Lorem, ipsum dolor sit amet
        consectetur adipisicing elit. Repellat earum unde nesciunt enim quo vel,
        molestias nam perspiciatis, itaque tempora sequi odio cum officiis, qui
        at minus sed nisi iure! Lorem, ipsum dolor sit amet consectetur
        adipisicing elit. Repellat earum unde nesciunt enim quo vel, molestias
        nam perspiciatis, itaque tempora sequi odio cum officiis, qui at minus
        sed nisi iure! Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Repellat earum unde nesciunt enim quo vel, molestias nam perspiciatis,
        itaque tempora sequi odio cum officiis, qui at minus sed nisi iure!
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat earum
        unde nesciunt enim quo vel, molestias nam perspiciatis, itaque tempora
        sequi odio cum officiis, qui at minus sed nisi iure! Lorem, ipsum dolor
        sit amet consectetur adipisicing elit. Repellat earum unde nesciunt enim
        quo vel, molestias nam perspiciatis, itaque tempora sequi odio cum
        officiis, qui at minus sed nisi iure! Lorem, ipsum dolor sit amet
        consectetur adipisicing elit. Repellat earum unde nesciunt enim quo vel,
        molestias nam perspiciatis, itaque tempora sequi odio cum officiis, qui
        at minus sed nisi iure! Lorem, ipsum dolor sit amet consectetur
        adipisicing elit. Repellat earum unde nesciunt enim quo vel, molestias
        nam perspiciatis, itaque tempora sequi odio cum officiis, qui at minus
        sed nisi iure!
      </p>
    </div>
    <div>
      <h1>2</h1>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat earum
        unde nesciunt enim quo vel, molestias nam perspiciatis, itaque tempora
        sequi odio cum officiis, qui at minus sed nisi iure! Lorem, ipsum dolor
        sit amet consectetur adipisicing elit. Repellat earum unde nesciunt enim
        quo vel, molestias nam perspiciatis, itaque tempora sequi odio cum
        officiis, qui at minus sed nisi iure! Lorem, ipsum dolor sit amet
        consectetur adipisicing elit. Repellat earum unde nesciunt enim quo vel,
        molestias nam perspiciatis, itaque tempora sequi odio cum officiis, qui
        at minus sed nisi iure! Lorem, ipsum dolor sit amet consectetur
        adipisicing elit. Repellat earum unde nesciunt enim quo vel, molestias
        nam perspiciatis, itaque tempora sequi odio cum officiis, qui at minus
        sed nisi iure! Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Repellat earum unde nesciunt enim quo vel, molestias nam perspiciatis,
        itaque tempora sequi odio cum officiis, qui at minus sed nisi iure!
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat earum
        unde nesciunt enim quo vel, molestias nam perspiciatis, itaque tempora
        sequi odio cum officiis, qui at minus sed nisi iure! Lorem, ipsum dolor
        sit amet consectetur adipisicing elit. Repellat earum unde nesciunt enim
        quo vel, molestias nam perspiciatis, itaque tempora sequi odio cum
        officiis, qui at minus sed nisi iure! Lorem, ipsum dolor sit amet
        consectetur adipisicing elit. Repellat earum unde nesciunt enim quo vel,
        molestias nam perspiciatis, itaque tempora sequi odio cum officiis, qui
        at minus sed nisi iure! Lorem, ipsum dolor sit amet consectetur
        adipisicing elit. Repellat earum unde nesciunt enim quo vel, molestias
        nam perspiciatis, itaque tempora sequi odio cum officiis, qui at minus
        sed nisi iure!
      </p>
    </div>
  </>
);
