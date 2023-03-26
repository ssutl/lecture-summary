import { summaryArrayType } from "@/pages/api/summary";
import React, { useState, useEffect } from "react";
import styles from "../styles/summaryModal.module.scss";
import ContentCopy from "@mui/icons-material/ContentCopy";
import notify from "@/helpers/notification";

type SummaryModalProps = {
  modalToggle: () => void;
};
const SummaryModal = ({ modalToggle }: SummaryModalProps) => {
  const [sessionSummaries, setSessionSummaries] = useState<summaryArrayType[]>(
    []
  );
  useEffect(() => {
    const summaries = sessionStorage.getItem("logged_summaries");
    if (summaries) {
      const parsedArray = JSON.parse(summaries);
      setSessionSummaries(parsedArray);
    }
  }, []);

  function handleCopyClick(index: number) {
    const element = document.querySelector(
      `#${styles.content}-${index} p`
    ) as HTMLElement;
    const text = element.innerText;
    navigator.clipboard.writeText(text);
    //Adding notification for successful copy
    notify("success");
  }

  return (
    <div className={styles.modalOverlay} onClick={() => modalToggle()}>
      <div
        className={styles.modal}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        {sessionSummaries.length === 0 ? (
          <p>No summaries this session</p>
        ) : null}
        <div className={styles.modalWidthContainer}>
          <h1 id={styles.titlo}>Session transcripts</h1>
          {Array.from(sessionSummaries) &&
            sessionSummaries.map((eachSummary, index) => (
              <div id={`${styles.content}-${index}`} key={index}>
                <ContentCopy
                  id={styles.copyIcon}
                  onClick={() => handleCopyClick(index)}
                />
                <h1>{eachSummary.title}</h1>
                <p>{eachSummary.summary}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SummaryModal;
