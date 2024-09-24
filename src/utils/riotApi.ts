// utils/riotApi.ts
export async function getChampionRotation() {
  const res = await fetch("/api/rotation");
  if (!res.ok) {
    throw new Error("로테이션 데이터를 가져오는 데 실패했습니다.");
  }
  return res.json();
}
