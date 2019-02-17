import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardListComponent } from './board-list.component';
import { BoardService } from '../services/board.service';
import { BroadcastService } from '../services/broadcast.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

fdescribe('/src/app/board-list/board-list.component.spec.ts', () => {
    let component: BoardListComponent;
    let fixture: ComponentFixture<BoardListComponent>;
    let mockBoardService : BoardService;
  
    beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [ BoardListComponent ],
          providers: [BoardService, BroadcastService],
          imports: [HttpClientModule]
        })
        .compileComponents();

        fixture = TestBed.createComponent(BoardListComponent);
        component = fixture.componentInstance;
    
        mockBoardService = TestBed.get(BoardService);

    }));
    
    it('should load boards, sizes and types', () => {
        spyOn(mockBoardService, 'getBoardsList').and.returnValue( of([
          { id : 1}, {id: 2}
        ]) );
        spyOn(mockBoardService, 'getBoardSizes').and.returnValue( of([
          {board_id: 1, volume : 800}, {board_id: 2, volume : 600}
        ]))
        spyOn(mockBoardService, 'getBoardTypes').and.returnValue( of([
          {board_id: 1, board_type_id: 1}, {board_id: 2, board_type_id : 2}
        ]))

        fixture.detectChanges();

        fixture.whenStable().then ( () => {
          expect(component).toBeTruthy();
          expect(component.boardList.length).toBe(2, 'boardList.length should be 2');
          expect(component.boardList[0].sizes.length).toBe(2, 'sizes.length should be 2');
          expect(component.boardList[0].types.length).toBe(2, 'types.length should be 2');
        });
    });
});
