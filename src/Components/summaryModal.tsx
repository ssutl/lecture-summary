import { summaryArrayType } from "@/pages/api/summary";
import React, { useState, useEffect } from "react";
import styles from "../styles/summaryModal.module.scss";

type SummaryModalProps = {
  close: () => void;
};
const SummaryModal = ({ close }: SummaryModalProps) => {
  const [sessionSummaries, setSessionSummaries] = useState<summaryArrayType[]>(
    []
  );
  useEffect(() => {
    const summaries = sessionStorage.getItem("logged_summaries");
    console.log("summaries", summaries);
    if (summaries) {
      const parsedArray = JSON.parse(summaries);
      setSessionSummaries(parsedArray);
    }
  }, []);

  return (
    <div
      className={styles.modalOverlay}
      onClick={() => {
        close();
      }}
    >
      <div className={styles.modal}>
        {sessionSummaries.length === 0 ? (
          <p>No summaries this session</p>
        ) : null}
        <div className={styles.modalWidthContainer}>
          <h1>Transcripts</h1>

          {sessionSummaries.map((eachSummary) => (
            <div>
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
