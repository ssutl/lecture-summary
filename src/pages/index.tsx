import styles from "../styles/landing.module.scss";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

export default function landing() {
  const [inputsAmount, setInputAmount] = useState(1);
  const [type, setType] = useState<"short" | "medium" | "in-depth">("short");

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

  return (
    <div className={styles.page}>
      <div className={styles.section1}>
        <h1>Transform lectures into bite-sized summaries</h1>
      </div>
      <div className={styles.section2}>
        <div className={styles.inputHalf}>
          {[...Array(inputsAmount)].map((eachInput, i) => (
            <div className={styles.inputHolder}>
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
          {/* { ? null : editInput()} */}
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
                  const selectedOption = (e.target as HTMLElement).innerHTML;
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
                  const selectedOption = (e.target as HTMLElement).innerHTML;
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
                  const selectedOption = (e.target as HTMLElement).innerHTML;
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
                in-depth
              </p>
            </div>
          </div>
          <div className={styles.generateButton}>
            <p>Generate</p>
          </div>
        </div>
      </div>
    </div>
  );
}
