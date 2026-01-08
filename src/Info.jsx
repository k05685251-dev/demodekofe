import React from "react";
import { Link } from "react-router-dom";
import "./Info.css";

const Info = () => {
  return (
    <div className="info-container">
      <h1>Ma’lumotlar va Bonuslar Haqida To‘liq Qo‘llanma</h1>

      {/* Bo‘lim 1 */}
      <section className="info-section">
        <h2>1. Promo kodlar nima va ularni ishlatish qoidalari</h2>
        <p>
          Promo kodlar – saytimiz foydalanuvchilari uchun maxsus yaratilgan kodlar bo‘lib, ular yordamida siz turli mahsulotlar uchun chegirma yoki bonus olishingiz mumkin. 
          Har bir promo kod faqat bir marta ishlatiladi va foydalanuvchining hisobiga bog‘lanadi.
        </p>
        <p>
          Promo kodlarni ishlatish uchun siz bonus sahifasidagi input maydoniga kodni kiriting va “Tasdiqlash” tugmasini bosing. 
          Agar kod to‘g‘ri bo‘lsa, bonus tugmalari ochiladi va siz turli chegirmalarga ega bo‘lasiz.
        </p>
        <ul>
          <li>Har bir kod faqat bir marta ishlatiladi.</li>
          <li>Promo kodni faqat bonus sahifasidagi inputga kiritish mumkin.</li>
          <li>Agar kod noto‘g‘ri bo‘lsa, tizim xato haqida ogohlantiradi.</li>
          <li>Promo kodlar amal qilish muddati bilan cheklangan bo‘lishi mumkin.</li>
          <li>Promo kodlar boshqalar bilan bo‘lishilmasligi tavsiya etiladi.</li>
        </ul>
      </section>

      {/* Bo‘lim 2 */}
      <section className="info-section">
        <h2>2. Bonuslar va chegirmalar tizimi</h2>
        <p>
          Bizning saytimizda bonuslar va chegirmalar tizimi foydalanuvchilarni rag‘batlantirish va sodiqlikni oshirish uchun yaratilgan. Siz promo kod kiritganingizdan so‘ng, bonus tugmalari ochiladi:
        </p>
        <ol>
          <li>Coffee – 20% chegirma</li>
          <li>Tea – 10% chegirma</li>
          <li>Dessert – 30% chegirma</li>
          <li>Maxsus sovg‘a – tasodifiy berilishi mumkin</li>
        </ol>
        <p>
          Bonuslar avtomatik tarzda hisoblanadi va mahsulot savatiga qo‘shilganida aks etadi. Shu bilan birga, chegirmalar summasi ham avtomatik yangilanadi.
        </p>
        <p>
          <strong>Misol:</strong> Agar siz 50 000 so‘mlik coffee sotib olsangiz va 20% chegirma kodini ishlatsangiz, siz 10 000 so‘m tejaysiz. Shu bilan birga, sizga maxsus sovg‘a berilishi mumkin.
        </p>
      </section>

      {/* Bo‘lim 3 */}
      <section className="info-section">
        <h2>3. Bonuslarni maksimal ishlatish strategiyalari</h2>
        <p>
          Chegirmalarni va bonuslarni maksimal darajada ishlatish uchun quyidagi tavsiyalarni o‘qing:
        </p>
        <ul>
          <li>Bir nechta mahsulot sotib olayotganda, har bir mahsulotga alohida chegirma qo‘llang.</li>
          <li>Promo kodlarni faqat ishonchli manbalardan oling va boshqalar bilan bo‘lishmang.</li>
          <li>Bonuslarni to‘liq foydalanish uchun mahsulotni xarid qilishdan oldin barcha mavjud kodlarni tekshiring.</li>
          <li>Bepul sovg‘alar yoki bonuslar vaqtinchalik bo‘lishi mumkin.</li>
          <li>Agar siz ko‘p xarid qilmoqchi bo‘lsangiz, bonuslar va chegirmalarni birma-bir tekshirib qo‘shing.</li>
        </ul>
        <p>
          Shu bilan birga, har bir mahsulot bo‘yicha chegirma foizini hisoblab chiqing. Bu sizga maksimal tejash imkonini beradi.
        </p>
      </section>

      {/* Bo‘lim 4 */}
      <section className="info-section">
        <h2>4. Promo kodlarni ishlatishda tez-tez uchraydigan xatolar</h2>
        <ul>
          <li>Kodni noto‘g‘ri yozish (katta va kichik harflarga e’tibor berish kerak).</li>
          <li>Kodni allaqachon ishlatgan bo‘lishingiz.</li>
          <li>Kodning amal qilish muddati tugagan bo‘lishi.</li>
          <li>Kodni noto‘g‘ri sahifaga kiritish (faqat bonus sahifasida ishlaydi).</li>
        </ul>
      </section>

      {/* Bo‘lim 5 */}
      <section className="info-section">
        <h2>5. Foydalanuvchi tajribasi va maslahatlar</h2>
        <p>
          - Promo kodlarni saqlang va boshqalar bilan bo‘lishmang. <br/>
          - Har bir chegirma va bonusni faqat o‘zingiz ishlating. <br/>
          - Agar bir nechta mahsulot sotib olmoqchi bo‘lsangiz, har birini alohida tekshiring. <br/>
          - Bonuslar va sovg‘alar vaqtinchalik bo‘lishi mumkin, shuning uchun imkoniyatni qo‘ldan boy bermang.
        </p>
      </section>

      {/* Bo‘lim 6 */}
      <section className="info-section">
        <h2>6. Eng ko‘p beriladigan savol va javoblar (FAQ)</h2>

        <h3>Q1: Promo kod ishlamayapti, nima qilishim kerak?</h3>
        <p>A: Kod noto‘g‘ri yozilgan bo‘lishi mumkin yoki kod allaqachon ishlatilgan. Iltimos, to‘liq va to‘g‘ri kiriting yoki biz bilan bog‘laning.</p>

        <h3>Q2: Bonuslar qancha muddatga amal qiladi?</h3>
        <p>A: Bonuslar odatda promo kodning amal qilish muddati bilan cheklangan. Bu muddatni sahifada ko‘rsatilgan sanaga qarab tekshiring.</p>

        <h3>Q3: Bepul sovg‘ani qanday olish mumkin?</h3>
        <p>A: Ba’zi bonuslar tasodifiy ravishda beriladi va promo kod orqali faollashadi. Bepul sovg‘alar faqat ma’lum vaqt davomida mavjud bo‘ladi.</p>

        <h3>Q4: Chegirmalar bir-biriga qo‘shiladimi?</h3>
        <p>A: Odatda promo kodlar bir-biriga qo‘shilmaydi. Har bir mahsulot uchun faqat bitta chegirma ishlatiladi.</p>

        <h3>Q5: Promo kodni qayta ishlatish mumkinmi?</h3>
        <p>A: Yo‘q, har bir promo kod bir marta ishlatiladi. Yangi chegirmalarni olish uchun boshqa kodni ishlatishingiz kerak.</p>
      </section>

      {/* Bonusga qaytish tugmasi */}
      <div style={{ marginTop: "50px", textAlign: "center" }}>
        <Link to="/bonus" className="bonus-btn">Bonusga qaytish</Link>
      </div>
    </div>
  );
};

export default Info;
