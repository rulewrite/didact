import { appState } from './appState';
import { commitRoot } from './commit/commitRoot';
import { performFiber } from './render/performFiber';

/**
 * 렌더 > 커밋(실제 돔 바인딩) 단계로 수행
 * @param idleDeadline
 */
export function workLoop(idleDeadline: IdleDeadline): void {
  // 파이버 해석하며 DOM 생성
  while (appState.currentFiber) {
    appState.currentFiber = performFiber(appState.currentFiber);

    // 남은 유휴 시간 추정치
    const remaining = idleDeadline.timeRemaining();
    if (remaining < 1) {
      break;
    }
  }

  const isFinishPerformFiber = !appState.currentFiber;
  const hasCommitTarget = appState.workInProgressRootFiber;
  if (isFinishPerformFiber && hasCommitTarget) {
    commitRoot();
    // 현재 루트 파이버 갱신
    appState.currentRootFiber = appState.workInProgressRootFiber;
    // 작업 중인 루트 초기화
    appState.workInProgressRootFiber = null;
  }

  // 유휴 시간 루프
  requestIdleCallback(workLoop);
}
