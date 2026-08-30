import { craft } from "@/lib/content";
import { wrap } from "@/lib/wrap";
import styles from "./Diagram.module.css";

/**
 * Two lanes. The model drafts, a person decides, and nothing crosses from the
 * top lane to the bottom one without passing a gate.
 */

const COL_W = 190;
const GAP = 16;
const X0 = 176;
const AI_Y = 84;
const HU_Y = 236;
const BOX_H = 96;

export default function PipelineDiagram() {
  return (
    <figure className={`${styles.frame} ${styles.paper}`}>
      <figcaption className={styles.frameHead}>
        <span className="label label--mono">Where the model helps, and where it doesn&rsquo;t</span>
        <span className="label label--mono">fig. 02</span>
      </figcaption>

      <div className={styles.scroller}>
        <svg
          className={styles.svg}
          viewBox="0 0 1200 430"
          role="img"
          aria-label="A two-lane pipeline. In the top lane the model drafts options, first-pass code, tests, checks and documentation. In the bottom lane people decide the approach, the architecture, what correct means, the security boundaries and who signs off the release. Every step crosses from the model’s lane to a person’s lane through a gate."
        >
          <rect x={X0 - 12} y={AI_Y - 12} width={5 * COL_W + 4 * GAP + 24} height={BOX_H + 24} rx={8} className={styles.laneBandAi} />
          <rect x={X0 - 12} y={HU_Y - 12} width={5 * COL_W + 4 * GAP + 24} height={BOX_H + 24} rx={8} className={styles.laneBandHuman} />

          <text className={styles.laneLabel} x={20} y={AI_Y + 30}>
            The model
          </text>
          <text className={styles.boxCaption} x={20} y={AI_Y + 50}>
            drafts
          </text>
          <text className={styles.laneLabel} x={20} y={HU_Y + 30}>
            A person
          </text>
          <text className={styles.boxCaptionAccent} x={20} y={HU_Y + 50}>
            decides
          </text>

          {craft.columns.map((col, i) => {
            const x = X0 + i * (COL_W + GAP);
            const cx = x + COL_W / 2;
            return (
              <g key={col.stage}>
                <text className={styles.stageLabel} x={x} y={AI_Y - 26}>
                  {String(i + 1).padStart(2, "0")} {col.stage}
                </text>

                <rect x={x} y={AI_Y} width={COL_W} height={BOX_H} rx={6} className={styles.box} />
                {wrap(col.ai, 24).map((line, l) => (
                  <text key={line} className={styles.boxLine} x={x + 14} y={AI_Y + 32 + l * 18}>
                    {line}
                  </text>
                ))}

                <path pathLength={1} className={styles.wireAccent} d={`M${cx} ${AI_Y + BOX_H}V${HU_Y}`} />
                <path
                  className={styles.gate}
                  d={`M${cx} ${AI_Y + BOX_H + 20}L${cx + 9} ${AI_Y + BOX_H + 30}L${cx} ${AI_Y + BOX_H + 40}L${cx - 9} ${AI_Y + BOX_H + 30}Z`}
                />
                <path className={styles.head} d={`M${cx - 4} ${HU_Y - 9}L${cx} ${HU_Y}L${cx + 4} ${HU_Y - 9}Z`} />

                <rect x={x} y={HU_Y} width={COL_W} height={BOX_H} rx={6} className={styles.boxAccent} />
                {wrap(col.human, 24).map((line, l) => (
                  <text key={line} className={styles.boxLineStrong} x={x + 14} y={HU_Y + 32 + l * 18}>
                    {line}
                  </text>
                ))}

                {i < craft.columns.length - 1 ? (
                  <path pathLength={1}
                    className={styles.wireSoft}
                    d={`M${x + COL_W} ${HU_Y + BOX_H / 2}H${x + COL_W + GAP}`}
                  />
                ) : null}
              </g>
            );
          })}

          <path pathLength={1} className={styles.wireSoft} d={`M${X0 - 12} 392H1180`} />
          <text className={styles.scaleLabel} x={X0 - 12} y={412}>
            nothing crosses the gate on its own
          </text>
        </svg>
      </div>

      <p className={`label ${styles.hint}`}>Scroll the diagram sideways →</p>
    </figure>
  );
}
